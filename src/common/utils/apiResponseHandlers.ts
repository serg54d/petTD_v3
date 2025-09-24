// common/utils/apiResponseHandlers.ts
import { changeToast } from "@/common/components/Toast/toast-slice";

/**
 * Показать info тост
 */
export const showInfoToast = (thunkAPI: any, message: string) => {
  thunkAPI.dispatch(
    changeToast({
      status: "info",
      notification: message,
    })
  );
};

export const showInfoWithCanceledToast = (thunkAPI: any, message: string) => {
  thunkAPI.dispatch(
    changeToast({
      status: "infoWithCanceled",
      notification: message,
    })
  );
};

/**
 * Показать success тост
 */
export const showSuccessToast = (thunkAPI: any, message: string) => {
  thunkAPI.dispatch(
    changeToast({
      status: "success",
      notification: message,
    })
  );
};

/**
 * Показать error тост
 */
export const showErrorToast = (thunkAPI: any, message: string) => {
  thunkAPI.dispatch(
    changeToast({
      status: "error",
      notification: message,
    })
  );
};

/**
 * Обработка ошибок из resultCode
 */
export const handleResultError = (
  thunkAPI: any,
  result: any,
  defaultMessage: string = "Operation failed"
) => {
  const errorMessage = result?.messages?.[0] || defaultMessage;
  showErrorToast(thunkAPI, errorMessage);
  return thunkAPI.rejectWithValue(errorMessage);
};

/**
 * Обработка HTTP ошибок (catch)
 */
export const handleHttpError = (
  thunkAPI: any,
  error: any,
  defaultMessage: string = "An error occurred"
) => {
  const errorMessage =
    error?.response?.data?.messages?.[0] || error?.message || defaultMessage;
  showErrorToast(thunkAPI, errorMessage);
  return thunkAPI.rejectWithValue(errorMessage);
};
