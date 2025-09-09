// types

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodolistType } from "@/app/App";
import { FilterValues } from "@/common/enums/enums";
import { todolistsApi } from "../../api/requests/todolistsApi";
import { RootState } from "@/app/store";

export const selectTodolists = (state: RootState): TodolistType[] =>
  state.todolists;

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
      .addCase(fetchTodolistsTC.rejected, () => {
        console.error("Failed to fetch todolists");
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const { id, newTitle } = action.payload;
        const todolist = state.find((todolist) => todolist.id === id);
        if (todolist) {
          todolist.title = newTitle;
        }
      })
      .addCase(changeTodolistTitleTC.rejected, () => {
        console.error("Failed to change todolist title");
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        const { title, id } = action.payload;
        const newTodolist: TodolistType = {
          filter: FilterValues.All,
          id,
          title,
        };
        state.push(newTodolist);
      })
      .addCase(addTodolistTC.rejected, () => {
        console.error("Failed to create todolist");
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.findIndex((todolist) => todolist.id === id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(deleteTodolistTC.rejected, () => {
        console.error("Failed to create todolist");
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
  }),
});

export const { changeTodolistFilter } = todolistsSlice.actions;
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

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; newTitle: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.changeTodolistTitle(
        payload.newTitle,
        payload.id
      );
      if (res.data.resultCode === 0) {
        return { id: payload.id, newTitle: payload.newTitle };
      } else {
        return thunkAPI.rejectWithValue(res.data.messages[0]);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/addTodolistTC`,
  async (payload: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(payload.title);
      if (res.data.resultCode === 0) {
        return { title: payload.title, id: res.data.data.item.id };
      } else {
        return thunkAPI.rejectWithValue(res.data.messages[0]);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.removeTodolist(payload.id);
      if (res.data.resultCode === 0) {
        return { id: payload.id };
      } else {
        return thunkAPI.rejectWithValue(res.data.messages[0]);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
