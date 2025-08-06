import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";
import {
  AddTodolistActionType,
  DeleteTodolistActionType,
} from "./todolists-reducer";

// types

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type TasksReducerType =
  | AddTodolistActionType
  | DeleteTodolistActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

// AC

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { todolistId, taskId },
  } as const;
};

export const addTaskAC = (todolistId: string, text: string, taskId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todolistId,
      text,
      taskId,
    },
  } as const;
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todolistId,
      taskId,
      status,
    },
  } as const;
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      todolistId,
      taskId,
      title,
    },
  } as const;
};

// Reducer

export const tasksReducer = (
  tasks: TasksStateType,
  action: TasksReducerType
): TasksStateType => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return { ...tasks, [action.payload.id]: [] };
    }

    case "DELETE-TODOLIST": {
      const newState = { ...tasks };
      delete newState[action.payload.id];
      return newState;
    }
    case "REMOVE-TASK": {
      const { taskId, todolistId } = action.payload;
      return (tasks = {
        ...tasks,
        [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
      });
    }
    case "ADD-TASK": {
      const { todolistId, text, taskId } = action.payload;
      const newTask: TaskType = { isDone: false, text, id: taskId };
      return (tasks = {
        ...tasks,
        [todolistId]: [newTask, ...tasks[todolistId]],
      });
    }

    case "CHANGE-TASK-STATUS": {
      const { todolistId, taskId, status } = action.payload;
      return (tasks = {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          taskId === task.id ? { ...task, isDone: status } : task
        ),
      });
    }
    case "CHANGE-TASK-TITLE": {
      const { todolistId, taskId, title } = action.payload;
      return (tasks = {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          taskId === task.id ? { ...task, text: title } : task
        ),
      });
    }
    default:
      return tasks;
  }
};
