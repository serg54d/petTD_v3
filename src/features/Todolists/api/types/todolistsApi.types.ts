import { ResultCode } from "../../lib/enums";

export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  resultCode: ResultCode;
  messages: string[];
  fieldsErrors: FieldError[];
};
