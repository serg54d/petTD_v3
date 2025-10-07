import "@/app/App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppHeader } from "@/app/AppHeader";
import { AppMain } from "@/app/AppMain";
import { useAppSelector } from "@/common/hooks/useAppSelector";

import { TaskType } from "@/features/Todolists/ui/Todolist/Todolist";
import { FilterValues } from "@/common/enums/enums";
import { selectTheme } from "./app-slice";
import { useEffect } from "react";
import { RequestStatus } from "@/common/types/types";
import Toast from "@/common/components/Toast/Toast";
import { Routes } from "react-router";
import { Routing } from "@/common/routing";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { meTC, selectAuth } from "@/features/auth/model/auth-slice";
import CircularProgressWithLabel from "@/common/components/CircularProgressWithLabel";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
  entityStatus: RequestStatus;
  // опциональные поля из API
  addedDate?: string;
  order?: number;
};
export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function App() {
  const themeMode = useAppSelector(selectTheme);
  useEffect(() => {
    if (themeMode === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [themeMode]);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "dark" ? "#6d9ee6" : "#4a6fa5",
      },
      secondary: {
        main: themeMode === "dark" ? "#4a8bb8" : "#166088",
      },
      background: {
        default: themeMode === "dark" ? "#121212" : "#f5f7fa",
        paper: themeMode === "dark" ? "#1e1e1e" : "#ffffff",
      },
    },
  });
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (isLoggedIn === undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgressWithLabel />
      </div>
    );
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader />

        <Routing />
        <Toast />
      </ThemeProvider>
    </div>
  );
}

export default App;
