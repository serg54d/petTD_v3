import { FilterValuesType, TodolistType } from "../AppWithReducers";

// types

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeFilterTodolist = ReturnType<typeof changeFilterTodolistAC>;

type TodolistsReducerType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeFilterTodolist;

// action creators

export const deleteTodolistAC = (id: string) => {
  return { type: "DELETE-TODOLIST", payload: { id } } as const;
};

export const addTodolistAC = (payload: { title: string; id: string }) => {
  return { type: "ADD-TODOLIST", payload } as const;
};

export const changeTodolistTitleAC = (payload: {
  id: string;
  newTitle: string;
}) => {
  return { type: "CHANGE-TITLE", payload } as const;
};

export const changeFilterTodolistAC = (payload: {
  newFilter: FilterValuesType;
  id: string;
}) => {
  return { type: "CHANGE-FILTER", payload } as const;
};

// reducer

export const todolistsReducer = (
  todolists: TodolistType[],
  action: TodolistsReducerType
): TodolistType[] => {
  const { id } = action.payload;

  switch (action.type) {
    case "DELETE-TODOLIST":
      return todolists.filter((todolist) => todolist.id !== id);
    case "ADD-TODOLIST":
      const { title } = action.payload;

      const newTodolist: TodolistType = {
        filter: "all",
        id,
        title,
      };
      return [...todolists, newTodolist];
    case "CHANGE-TITLE":
      const { newTitle } = action.payload;

      return todolists.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, title: newTitle }
          : todolist
      );
    case "CHANGE-FILTER":
      const { newFilter } = action.payload;

      return todolists.map((todolist) =>
        todolist.id === action.payload.id
          ? { ...todolist, filter: newFilter }
          : todolist
      );
    default:
      return todolists;
  }
};
