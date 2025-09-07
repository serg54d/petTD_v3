import { ThemeMode } from "@/app/AppHeader";
import { createSlice } from "@reduxjs/toolkit";

export type AppStateType = {
  theme: ThemeMode;
};

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
