import { ThemeMode } from "@/app/AppHeader";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppStateType = {
  theme: ThemeMode;
};

export const selectTheme = (state: RootState): ThemeMode => state.app.theme;

const initialState: AppStateType = {
  theme: "light", // начальная тема
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
  }),
});

export const { changeThemeModeAC } = appSlice.actions;
export const appReducer = appSlice.reducer;
