export type TaskType = {
  description: string | null;
  title: string;
  completed: boolean | null;
  status: number;
  priority: number | null;
  startDate: string | null; // datetime как string
  deadline: string | null; // datetime как string
  id: string;
  todoListId: string;
  order: number | null;
  addedDate: string | null; // datetime как string
};

export type BaseTaskResponse<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
