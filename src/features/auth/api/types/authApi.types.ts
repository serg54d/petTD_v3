import { ResultCode } from "@/features/Todolists/lib/enums";

export type BaseAuthResponse<T = {}> = {
  resultCode: ResultCode;
  messages: string[];
  data: T;
};
