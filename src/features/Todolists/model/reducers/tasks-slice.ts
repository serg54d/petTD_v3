import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksStateType } from "@/app/App";
import { DomainTaskType } from "@/features/Todolists/api/types/tasksApi.types";
import { TaskStatus } from "../../lib/enums";
import { TaskType } from "../../ui/Todolist/Todolist";
import { RootState } from "@/app/store";
import { ModelUpdateType, tasksApi } from "../../api/requests/tasksApi";
import {
  addTodolistTC,
  deleteTodolistTC,
  selectTodolists,
} from "./todolists-slice";
import { getLoadingStatus } from "@/app/app-slice";

export const selectTasks = (state: RootState): TasksStateType => state.tasks;
const initialState: TasksStateType = {};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(changeTaskTitleTC.fulfilled, (state, action) => {
        const { todolistId, taskId, title } = action.payload;
        const task = state[todolistId].find((task) => task.id === taskId);
        if (task) {
          task.text = title;
        }
      })
      .addCase(changeTaskStatusTC.fulfilled, (state, action) => {
        const { todolistId, taskId, status } = action.payload;
        const task = state[todolistId].find((task) => task.id === taskId);
        if (task) {
          task.isDone = status;
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const { taskId, todolistId, text, status } = action.payload;
        const newTask: TaskType = { id: taskId, isDone: status, text };
        state[todolistId].unshift(newTask);
      })
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const { taskId, todolistId } = action.payload;
        const index = state[todolistId].findIndex((task) => task.id === taskId);
        state[todolistId].splice(index, 1);
      })
      .addCase(setTasksTC.fulfilled, (state, action) => {
        const { allTasks } = action.payload;
        Object.entries(allTasks).forEach(([todolistId, tasks]) => {
          state[todolistId] = tasks.map((task) => ({
            text: task.title,
            id: task.id,
            isDone: task.status,
          }));
        });
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        const { id } = action.payload;
        state[id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  reducers: () => ({}),
});

export const tasksReducer = tasksSlice.reducer;

export const changeTaskTitleTC = createAsyncThunk(
  `${tasksSlice.name}/changeTaskTitleTC`,
  async (
    payload: { todolistId: string; taskId: string; title: string },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const task = selectTasks(state)[payload.todolistId].find(
        (task) => task.id === payload.taskId
      );
      if (task) {
        const model: ModelUpdateType = {
          completed: null,
          deadline: null,
          description: null,
          priority: 0,
          startDate: null,
          status: task.isDone,
          title: payload.title,
        };
        const res = await tasksApi.updateTask(
          model,
          payload.todolistId,
          payload.taskId
        );
        if (res.data.resultCode === 0) {
          return payload;
        } else {
          return thunkAPI.rejectWithValue(res.data.messages[0]);
        }
      } else {
        return thunkAPI.rejectWithValue("Task not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeTaskStatusTC = createAsyncThunk(
  `${tasksSlice.name}/changeTaskStatusTC`,
  async (
    payload: { todolistId: string; taskId: string; status: TaskStatus },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const task = selectTasks(state)[payload.todolistId].find(
        (task) => task.id === payload.taskId
      );
      if (task) {
        const model: ModelUpdateType = {
          completed: null,
          deadline: null,
          description: null,
          priority: 0,
          startDate: null,
          status: payload.status,
          title: task.text,
        };
        const res = await tasksApi.updateTask(
          model,
          payload.todolistId,
          payload.taskId
        );
        if (res.data.resultCode === 0) {
          return payload;
        } else {
          return thunkAPI.rejectWithValue(res.data.messages[0]);
        }
      } else {
        return thunkAPI.rejectWithValue("Task not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTaskTC = createAsyncThunk(
  `${tasksSlice}/addTaskTC`,
  async (
    payload: {
      todolistId: string;
      text: string;
      status: TaskStatus;
      taskId: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await tasksApi.createTask(payload.todolistId, payload.text);
      if (res.data.resultCode === 0) {
        return {
          ...payload,
          taskId: res.data.data.item.id,
        };
      } else {
        return thunkAPI.rejectWithValue(res.data.messages[0]);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeTaskTC = createAsyncThunk(
  `${tasksSlice.name}/removeTaskTC`,
  async (payload: { taskId: string; todolistId: string }, thunkAPI) => {
    try {
      const res = await tasksApi.deleteTask(payload.todolistId, payload.taskId);
      if (res.data.resultCode === 0) {
        return payload;
      } else {
        return thunkAPI.rejectWithValue(res.data.messages[0]);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setTasksTC = createAsyncThunk(
  `${tasksSlice.name}/setTasksTC`,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const todolists = selectTodolists(state);
      const allTasks: { [todolistId: string]: DomainTaskType[] } = {}; // Явная типизация

      for (const todolist of todolists) {
        try {
          thunkAPI.dispatch(getLoadingStatus({ status: "pending" }));
          const res = await tasksApi.getTasks(todolist.id);
          allTasks[todolist.id] = res.data.items;
          thunkAPI.dispatch(getLoadingStatus({ status: "succeeded" }));
        } catch (error) {
          thunkAPI.dispatch(getLoadingStatus({ status: "failed" }));
          console.error(
            `Failed to load tasks for todolist ${todolist.id}:`,
            error
          );
          allTasks[todolist.id] = []; // Добавляем пустой массив при ошибке
        }
      }
      return { allTasks };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
