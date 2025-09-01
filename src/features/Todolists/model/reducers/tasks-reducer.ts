import { createAction, createReducer } from "@reduxjs/toolkit";
import { TasksStateType } from "@/app/AppWithRedux";
import { TaskType } from "@/features/Todolists/Todolist/Todolist";
import {
  addTodolist,
  AddTodolistActionType,
  deleteTodolist,
  DeleteTodolistActionType,
} from "@/features/Todolists/model/reducers/todolists-reducer";

// types

type RemoveTaskActionType = ReturnType<typeof removeTask>;
type AddTaskActionType = ReturnType<typeof addTask>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;

type TasksReducerType =
  | AddTodolistActionType
  | DeleteTodolistActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

// AC

export const removeTask = createAction<{ todolistId: string; taskId: string }>(
  "tasks/removeTask"
);

export const addTask = createAction<{
  todolistId: string;
  text: string;
  taskId: string;
}>("tasks/addTask");

export const changeTaskStatus = createAction<{
  todolistId: string;
  taskId: string;
  status: boolean;
}>("tasks/changeTaskStatus");

export const changeTaskTitle = createAction<{
  todolistId: string;
  taskId: string;
  title: string;
}>("tasks/changeTaskTitle");

const initialState: TasksStateType = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder.addCase(removeTask, (state, action) => {
    const { taskId, todolistId } = action.payload;
    const index = state[todolistId].findIndex((task) => task.id === taskId);
    if (index !== -1) {
      state[todolistId].splice(index, 1);
    }
  });

  builder.addCase(addTask, (state, action) => {
    const { taskId, todolistId, text } = action.payload;
    const newTask: TaskType = { id: taskId, isDone: false, text };
    state[todolistId].unshift(newTask);
  });

  builder.addCase(changeTaskStatus, (state, action) => {
    const { todolistId, taskId, status } = action.payload;
    const task = state[todolistId].find((task) => task.id === taskId);
    if (task) {
      task.isDone = status;
    }
  });

  builder.addCase(changeTaskTitle, (state, action) => {
    const { todolistId, taskId, title } = action.payload;
    const task = state[todolistId].find((task) => task.id === taskId);
    if (task) {
      task.text = title;
    }
  });

  builder.addCase(addTodolist, (state, action) => {
    const { id } = action.payload;
    state[id] = [];
  });

  builder.addMatcher(
    (action) => action.type === deleteTodolist.type,
    (state, action: any) => {
      delete state[action.payload.id];
    }
  );
});
