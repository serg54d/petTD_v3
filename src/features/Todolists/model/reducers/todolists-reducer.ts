// types

import { createAction, createReducer } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "@/app/AppWithRedux";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolist>;
export type AddTodolistActionType = ReturnType<typeof addTodolist>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitle
>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilter
>;

// type TodolistsReducerType =
//   | DeleteTodolistActionType
//   | AddTodolistActionType
//   | ChangeTodolistTitleActionType
//   | ChangeTodolistFilterActionType;

export const deleteTodolist = createAction<{ id: string }>(
  "todolists/deleteTodolist"
);

export const addTodolist = createAction<{ title: string; id: string }>(
  "todolists/addTodolist"
);

export const changeTodolistTitle = createAction<{
  id: string;
  newTitle: string;
}>("todolists/changeTitle");

export const changeTodolistFilter = createAction<{
  newFilter: FilterValuesType;
  id: string;
}>("todolists/changeTodolistFilter");

const initialState: TodolistType[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteTodolist, (state, action) => {
    const { id } = action.payload;
    const index = state.findIndex((todolist) => todolist.id === id);
    if (index !== -1) {
      state.splice(index, 1);
    }
  });

  builder.addCase(addTodolist, (state, action) => {
    const { title, id } = action.payload;

    const newTodolist: TodolistType = {
      filter: "all",
      id,
      title,
    };
    state.push(newTodolist);
  });

  builder.addCase(changeTodolistTitle, (state, action) => {
    const { id, newTitle } = action.payload;
    const todolist = state.find((todolist) => todolist.id === id);
    if (todolist) {
      todolist.title = newTitle;
    }
  });

  builder.addCase(changeTodolistFilter, (state, action) => {
    const { newFilter, id } = action.payload;
    const todolist = state.find((todolist) => todolist.id === id);
    if (todolist) {
      todolist.filter = newFilter;
    }
  });
});
