import { createSlice } from "@reduxjs/toolkit";
import { TasksStateType } from "@/app/App";
import { DomainTaskType } from "@/features/Todolists/api/types/tasksApi.types";

import { TaskStatus } from "../../lib/enums";
import { TaskType } from "../../ui/Todolist/Todolist";

const initialState: TasksStateType = {};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    addTodolist: create.reducer<{ id: string }>((state, action) => {
      const { id } = action.payload;
      state[id] = [];
    }),
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      delete state[action.payload.id];
    }),
    changeTaskTitle: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const { todolistId, taskId, title } = action.payload;
      const task = state[todolistId].find((task) => task.id === taskId);
      if (task) {
        task.text = title;
      }
    }),
    changeTaskStatus: create.reducer<{
      todolistId: string;
      taskId: string;
      status: TaskStatus;
    }>((state, action) => {
      const { todolistId, taskId, status } = action.payload;
      const task = state[todolistId].find((task) => task.id === taskId);
      if (task) {
        task.isDone = status;
      }
    }),
    addTask: create.reducer<{
      taskId: string;
      todolistId: string;
      text: string;
      status: TaskStatus;
      //   status: TaskStatus;
    }>((state, action) => {
      const { taskId, todolistId, text, status } = action.payload;
      const newTask: TaskType = { id: taskId, isDone: status, text };
      state[todolistId].unshift(newTask);
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>(
      (state, action) => {
        const { taskId, todolistId } = action.payload;
        const index = state[todolistId].findIndex((task) => task.id === taskId);
        if (index !== -1) {
          state[todolistId].splice(index, 1);
        }
      }
    ),
    setTasks: create.reducer<{ tasks: DomainTaskType[] }>((state, action) => {
      action.payload.tasks.forEach((task) => {
        if (!state[task.todoListId]) {
          state[task.todoListId] = [];
        }
        state[task.todoListId].push({
          text: task.title,
          id: task.id,
          isDone: task.status,
        });
      });
    }),
  }),
});

export const {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
  setTasks,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
