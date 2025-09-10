import { createSlice } from "@reduxjs/toolkit";
import { ToastStatusType, ToastType } from "./Toast";
import { RootState } from "@/app/store";

const initialState: ToastType = {
  status: "noActive",
  notification: "",
};

export const toastSelector = (state: RootState): ToastType => state.toast;

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  extraReducers: () => {},
  reducers: (create) => ({
    changeToast: create.reducer<{
      status: ToastStatusType;
      notification: string; 
    }>((state, action) => {
      //   debugger;
      state.notification = action.payload.notification;
      state.status = action.payload.status;
    }),
  }),
});

export const toastReducer = toastSlice.reducer;
export const { changeToast } = toastSlice.actions;
