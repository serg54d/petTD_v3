import { Todolist, Todolists } from "@/features/Todolists/Todolists";
import { instance } from "@/common/instance/instance";
import { BaseResponse } from "@/features/Todolists/api/types/todolistsApi.types";

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolists>("/todo-lists");
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {
      title,
    });
  },
  removeTodolist: (todolistId: string) => {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`);
  },
  changeTodolistTitle: (title: string, todolistId: string) => {
    return instance.put(`/todo-lists/${todolistId}`, { title });
  },
  
};
