// types

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodolistType } from "@/app/App";
import { FilterValues } from "@/common/enums/enums";
import { Todolists } from "../../Todolists";
import { todolistsApi } from "../../api/requests/todolistsApi";

const initialState: TodolistType[] = [];

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        const todolists = action.payload?.todolists;
        if (todolists) {
          const transformedTodolists = todolists.map((todolist) => ({
            id: todolist.id,
            title: todolist.title,
            filter: FilterValues.All,
            addedDate: todolist.addedDate,
            order: todolist.order,
          }));
          state.push(...transformedTodolists);
        }
      })
      .addCase(fetchTodolistsTC.rejected, (state, action) => {
        console.error("Failed to fetch todolists");
      });
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
    changeTodolistTitle: create.reducer<{ id: string; newTitle: string }>(
      (state, action) => {
        const { id, newTitle } = action.payload;
        const todolist = state.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.title = newTitle;
        }
      }
    ),
    addTodolist: create.reducer<{ title: string; id: string }>(
      (state, action) => {
        const { title, id } = action.payload;
        const newTodolist: TodolistType = {
          filter: FilterValues.All,
          id,
          title,
        };
        state.push(newTodolist);
      }
    ),
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((todolist) => todolist.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
  }),
});

export const {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;

// Thunks

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_, thunkAPI) => {
    try {
      const res = await todolistsApi.getTodolists();
      return { todolists: res.data };
    } catch (error) {
      //   console.log("Failed to load data: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
