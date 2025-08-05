import { TasksStateType } from "../App";
import {
  AddTodolistActionType,
  DeleteTodolistActionType,
} from "./todolists-reducer";

type TasksReducerType = AddTodolistActionType | DeleteTodolistActionType;

export const tasksReducer = (
  tasks: TasksStateType,
  action: TasksReducerType
) => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return { ...tasks, [action.payload.id]: [] };
    }

    case "DELETE-TODOLIST": {
      delete tasks[action.payload.id];
    }
    default:
      return tasks;
  }
};
