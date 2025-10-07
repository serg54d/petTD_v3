// types

import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { TodolistType } from "@/app/App";
import { FilterValues } from "@/common/enums/enums";
import { todolistsApi } from "../../api/requests/todolistsApi";
import { RootState } from "@/app/store";
import { getLoadingStatus } from "@/app/app-slice";
import { RequestStatus } from "@/common/types/types";

import {
  handleResultError,
  handleHttpError,
  showInfoToast,
  showSuccessToast,
  showInfoWithCanceledToast,
} from "@/common/utils/apiResponseHandlers";
import { Todolists } from "../../Todolists";
import { ResultCode } from "../../lib/enums";
import { toastSelector } from "@/common/components/Toast/toast-slice";

export const selectTodolists = (state: RootState): TodolistType[] =>
  state.todolists;

const initialState: TodolistType[] = [];

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const todolistsSlice = createSliceWithThunks({
  name: "todolists",
  initialState,
  extraReducers: (builder) => {
    builder;
  },
  reducers: (create) => ({
    changeTodolistFilter: create.reducer<{
      newFilter: FilterValues;
      id: string;
    }>((state, action) => {
      const { newFilter, id } = action.payload;
      const todolist = state.find((todolist) => todolist.id === id);
      if (todolist) {
        todolist.filter = newFilter;
      }
    }),
    changeTodolistEntityStatus: create.reducer<{
      entityStatus: RequestStatus;
      id: string;
    }>((state, action) => {
      const { entityStatus, id } = action.payload;
      const todolist = state.find((tl) => tl.id === id);
      if (!todolist) return;
      todolist.entityStatus = entityStatus;
    }),
    fetchTodolists: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          showInfoToast(thunkAPI, "Get todolists in the process");

          thunkAPI.dispatch(getLoadingStatus({ status: "pending" }));
          const res = await todolistsApi.getTodolists();

          thunkAPI.dispatch(getLoadingStatus({ status: "succeeded" }));
          showSuccessToast(thunkAPI, "Get todolists completed");

          return { todolists: res.data };
        } catch (error) {
          thunkAPI.dispatch(getLoadingStatus({ status: "failed" }));
          return handleHttpError(
            thunkAPI,
            error,
            "An error occurred while receiving todolists"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          const todolists = action.payload?.todolists;
          if (todolists) {
            const transformedTodolists = (todolists as Todolists).map(
              (todolist) => ({
                id: todolist.id,
                title: todolist.title,
                filter: FilterValues.All,
                addedDate: todolist.addedDate,
                order: todolist.order,
                entityStatus: "idle" as RequestStatus,
              })
            );
            state.push(...transformedTodolists);
          }
        },
        rejected: () => {
          console.error("Failed to change todolist title");
        },
      }
    ),
    changeTodolistTitle: create.asyncThunk(
      async (payload: { id: string; newTitle: string }, thunkAPI) => {
        try {
          showInfoToast(
            thunkAPI,
            "The title change of the todolist in progress"
          );

          const res = await todolistsApi.changeTodolistTitle(
            payload.newTitle,
            payload.id
          );

          if (res.data.resultCode === ResultCode.Success) {
            showSuccessToast(
              thunkAPI,
              "Change of todolist title was successful"
            );
            return { id: payload.id, newTitle: payload.newTitle };
          } else {
            return handleResultError(
              thunkAPI,
              res.data,
              "An error occurred while changing the todolist title"
            );
          }
        } catch (error) {
          return handleHttpError(
            thunkAPI,
            error,
            "An error occurred while changing the todolist title"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          const { id, newTitle } = action.payload;
          const todolist = state.find((todolist) => todolist.id === id);
          if (todolist) {
            todolist.title = newTitle;
          }
        },
        rejected: () => {
          console.error("Failed to change todolist title");
        },
      }
    ),
    addTodolist: create.asyncThunk(
      async (payload: { title: string }, thunkAPI) => {
        try {
          showInfoToast(thunkAPI, "Todolist create in progress");

          const res = await todolistsApi.createTodolist(payload.title);

          if (res.data.resultCode === ResultCode.Success) {
            showSuccessToast(thunkAPI, "Todolist is created");
            return { title: payload.title, id: res.data.data.item.id };
          } else {
            return handleResultError(
              thunkAPI,
              res.data,
              "An error occurred while creating the todolist"
            );
          }
        } catch (error) {
          return handleHttpError(
            thunkAPI,
            error,
            "An error occurred while creating the todolist"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          const { title, id } = action.payload;
          const newTodolist: TodolistType = {
            filter: FilterValues.All,
            id,
            title,
            entityStatus: "idle",
          };
          state.push(newTodolist);
        },
        rejected: () => {
          console.error("Failed to create todolist");
        },
      }
    ),
    deleteTodolist: create.asyncThunk(
      async (payload: { id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(
            changeTodolistEntityStatus({
              entityStatus: "pending",
              id: payload.id,
            })
          );

          showInfoWithCanceledToast(thunkAPI, "Todolist deletion in progress");

          // Оборачиваем setTimeout в Promise для правильной работы с async/await
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const state = thunkAPI.getState() as RootState;
          const { status: toastStatus } = toastSelector(state);

          if (toastStatus === "canceled") {
            thunkAPI.dispatch(
              changeTodolistEntityStatus({
                entityStatus: "idle",
                id: payload.id,
              })
            );
            return thunkAPI.rejectWithValue("Deletion canceled");
          }

          const res = await todolistsApi.removeTodolist(payload.id);

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(
              changeTodolistEntityStatus({
                entityStatus: "succeeded",
                id: payload.id,
              })
            );

            showSuccessToast(thunkAPI, "Todolist successfully removed");
            return { id: payload.id };
          } else {
            thunkAPI.dispatch(
              changeTodolistEntityStatus({
                entityStatus: "failed",
                id: payload.id,
              })
            );

            return handleResultError(
              thunkAPI,
              res.data,
              "Error while deleting todolist"
            );
          }
        } catch (error) {
          thunkAPI.dispatch(
            changeTodolistEntityStatus({
              entityStatus: "failed",
              id: payload.id,
            })
          );

          return handleHttpError(
            thunkAPI,
            error,
            "Error while deleting todolist"
          );
        }
      },
      {
        fulfilled: (state, action) => {
          const { id } = action.payload;
          const index = state.findIndex((todolist) => todolist.id === id);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
        rejected: () => {
          console.error("Failed to delete todolist");
        },
      }
    ),
  }),
});

export const {
  changeTodolistFilter,
  changeTodolistEntityStatus,
  fetchTodolists,
  changeTodolistTitle,
  addTodolist,
  deleteTodolist,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
