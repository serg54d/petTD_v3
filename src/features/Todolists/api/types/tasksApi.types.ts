import z from "zod";
import { ResultCode, TaskStatus } from "../../lib/enums";

// export type DomainTaskType = {
//   description: string | null;
//   title: string;
//   completed: boolean | null;
//   status: number;
//   priority: number | null;
//   startDate: string | null; // datetime как string
//   deadline: string | null; // datetime как string
//   id: string;
//   todoListId: string;
//   order: number | null;
//   addedDate: string | null; // datetime как string
// };

export type BaseTaskResponse<T = {}> = {
  resultCode: ResultCode;
  messages: string[];
  data: T;
};

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  //   addedDate: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  status: z.enum(TaskStatus),
  priority: z.number(),
});

export type DomainTaskType = z.infer<typeof domainTaskSchema>;
