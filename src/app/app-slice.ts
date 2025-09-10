import { ThemeMode } from "@/app/AppHeader";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RequestStatus } from "@/common/types/types";

export type AppStateType = {
  theme: ThemeMode;
  status: RequestStatus;
};

export const selectTheme = (state: RootState): ThemeMode => state.app.theme;
export const selectLoadingGetStatus = (state: RootState): RequestStatus =>
  state.app.status;

const initialState: AppStateType = {
  theme: "light", // начальная тема
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.theme = action.payload.themeMode === "light" ? "dark" : "light";
      }
    ),
    getLoadingStatus: create.reducer<{ status: RequestStatus }>(
      (state, action) => {
		
        state.status = action.payload.status;
      }
    ),
  }),
});

export const { changeThemeModeAC, getLoadingStatus } = appSlice.actions;
export const appReducer = appSlice.reducer;
