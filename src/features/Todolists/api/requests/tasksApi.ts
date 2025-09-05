import { instance } from "@/common/instance/instance";
import { BaseTaskResponse, TaskType } from "../types/tasksApi.types";

export type ModelUpdateType = {
  title: string;
  description: string | null;
  completed: boolean | null;
  status: number;
  priority: number | null;
  startDate: number | null;
  deadline: number | null;
};

export const tasksApi = {
  getTasks: (todolistId: string) => {
    return instance.get<{ items: TaskType[] }>(
      `/todo-lists/${todolistId}/tasks`
    );
  },
  createTask: (todolistId: string, title: string) => {
    return instance.post<BaseTaskResponse<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks`,
      {
        title,
      }
    );
  },
  updateTask: (model: ModelUpdateType, todolistId: string, taskId: string) => {
    return instance.put<BaseTaskResponse<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
  deleteTask: (todolistId: string, taskId: string) => {
    return instance.delete<BaseTaskResponse>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};
