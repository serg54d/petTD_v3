import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksStateType } from "@/app/App";
import {
  domainTaskSchema,
  DomainTaskType,
} from "@/features/Todolists/api/types/tasksApi.types";
import { ResultCode, TaskStatus } from "../../lib/enums";
import { TaskType } from "../../ui/Todolist/Todolist";
import { AppDispatch, RootState } from "@/app/store";
import { ModelUpdateType, tasksApi } from "../../api/requests/tasksApi";
import {
  addTodolistTC,
  deleteTodolistTC,
  selectTodolists,
} from "./todolists-slice";
import { getLoadingStatus } from "@/app/app-slice";
import {
  handleResultError,
  handleHttpError,
  showInfoToast,
  showSuccessToast,
  showErrorToast,
  showInfoWithCanceledToast, // Добавлен импорт
} from "@/common/utils/apiResponseHandlers";
import { RequestStatus } from "@/common/types/types";

import { toastSelector } from "@/common/components/Toast/toast-slice";
import { safeZodParse, safeZodParseArray } from "@/common/utils/zodValidation";

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
        const { taskId, todolistId, text, status, addedDate } = action.payload;
        const newTask: TaskType = {
          id: taskId,
          isDone: status,
          entityStatusTask: "idle",
          text,
          addedDate: addedDate,
        };
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
          state[todolistId] = (tasks as DomainTaskType[]).map(
            (task: DomainTaskType) => ({
              text: task.title,
              id: task.id,
              isDone: task.status,
              entityStatusTask: "idle",
              addedDate: task.addedDate,
            })
          );
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
  reducers: (create) => ({
    changeEntityStatusTask: create.reducer<{
      taskId: string;
      entityStatus: RequestStatus;
      todolistId: string;
    }>((state, action) => {
      const { entityStatus, taskId, todolistId } = action.payload;
      const task = state[todolistId].find((task) => task.id === taskId);
      if (task) {
        task.entityStatusTask = entityStatus;
      }
    }),
  }),
});

export const tasksReducer = tasksSlice.reducer;
export const { changeEntityStatusTask } = tasksSlice.actions;

// ... остальные thunk'и без изменений
export const changeTaskTitleTC = createAsyncThunk(
  `${tasksSlice.name}/changeTaskTitleTC`,
  async (
    payload: { todolistId: string; taskId: string; title: string },
    thunkAPI
  ) => {
    try {
      showInfoToast(thunkAPI, "The title change of the task in progress");

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

        if (res.data.resultCode === ResultCode.Success) {
          showSuccessToast(thunkAPI, "The title change of the task completed");
          return payload;
        } else {
          return handleResultError(
            thunkAPI,
            res.data,
            "The title change of the task ended with error"
          );
        }
      } else {
        return thunkAPI.rejectWithValue("Task not found");
      }
    } catch (error) {
      return handleHttpError(
        thunkAPI,
        error,
        "The title change of the task ended with error"
      );
    }
  }
);

export const changeTaskStatusTC = createAsyncThunk(
  `${tasksSlice.name}/changeTaskStatusTC`,
  async (
    payload: {
      todolistId: string;
      taskId: string;
      status: TaskStatus;
      addedDate: string;
    },
    thunkAPI
  ) => {
    try {
      showInfoToast(thunkAPI, "Change of task status is in progress");

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

        if (res.data.resultCode === ResultCode.Success) {
          showSuccessToast(thunkAPI, "Change of task status ended success");
          return payload;
        } else {
          return handleResultError(
            thunkAPI,
            res.data,
            "Change of task status ended with error"
          );
        }
      } else {
        return thunkAPI.rejectWithValue("Task not found");
      }
    } catch (error) {
      return handleHttpError(
        thunkAPI,
        error,
        "Change of task status ended with error"
      );
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
      showInfoToast(thunkAPI, "Task creation in progress");

      const res = await tasksApi.createTask(payload.todolistId, payload.text);

      safeZodParse(
        domainTaskSchema,
        res.data.data.item,
        `New task created: "${payload.text}"`
      );

      if (res.data.resultCode === ResultCode.Success) {
        showSuccessToast(thunkAPI, "Task created successfully");
        return {
          ...payload,
          addedDate: res.data.data.item.addedDate,
          taskId: res.data.data.item.id,
        };
      } else {
        return handleResultError(
          thunkAPI,
          res.data,
          "An error occurred while creating the task"
        );
      }
    } catch (error) {
      return handleHttpError(
        thunkAPI,
        error,
        "An error occurred while creating the task"
      );
    }
  }
);

export const removeTaskTC = createAsyncThunk(
  `${tasksSlice.name}/removeTaskTC`,
  async (payload: { taskId: string; todolistId: string }, thunkAPI) => {
    try {
      showInfoWithCanceledToast(thunkAPI, "Task deletion in progress");

      thunkAPI.dispatch(
        changeEntityStatusTask({
          entityStatus: "pending",
          taskId: payload.taskId,
          todolistId: payload.todolistId,
        })
      );

      // задержка для возможности отмены действия
      setTimeout(async () => {
        const state = thunkAPI.getState() as RootState;
        const { status: toastStatus } = toastSelector(state);

        if (toastStatus === "canceled") {
          thunkAPI.dispatch(
            changeEntityStatusTask({
              entityStatus: "idle",
              taskId: payload.taskId,
              todolistId: payload.todolistId,
            })
          );
          return; // Прерываем выполнение
        }

        const res = await tasksApi.deleteTask(
          payload.todolistId,
          payload.taskId
        );

        if (res.data.resultCode === ResultCode.Success) {
          showSuccessToast(thunkAPI, "Task deletion completed successfully");
          return payload;
        } else {
          return handleResultError(
            thunkAPI,
            res.data,
            "Task deletion failed with error"
          );
        }
      }, 3000);
    } catch (error) {
      return handleHttpError(
        thunkAPI,
        error,
        "Task deletion failed with error"
      );
    }
  }
);

export const setTasksTC = createAsyncThunk(
  `${tasksSlice.name}/setTasksTC`,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const todolists = selectTodolists(state);
      const allTasks: { [todolistId: string]: DomainTaskType[] } = {};

      if (todolists.length === 0) {
        return { allTasks: {} };
      }

      showInfoToast(thunkAPI, "Receiving task lists");

      for (const todolist of todolists) {
        try {
          thunkAPI.dispatch(getLoadingStatus({ status: "pending" }));
          const res = await tasksApi.getTasks(todolist.id);
          //   domainTaskSchema.array().parse(res.data.items);

          // zod логирование
          safeZodParseArray(
            domainTaskSchema,
            res.data.items,
            `setTasksTC for todolist "${todolist.title}" (${todolist.id})`
          );

          allTasks[todolist.id] = res.data.items;
          thunkAPI.dispatch(getLoadingStatus({ status: "succeeded" }));
        } catch (error) {
          thunkAPI.dispatch(getLoadingStatus({ status: "failed" }));
          allTasks[todolist.id] = [];
          showErrorToast(
            thunkAPI,
            `Failed to load tasks for todolist ${todolist.title}`
          );
        }
      }

      showSuccessToast(thunkAPI, "Task lists received successfully");
      return { allTasks };
    } catch (error) {
      return handleHttpError(
        thunkAPI,
        error,
        "An error occurred while retrieving task lists"
      );
    }
  }
);
