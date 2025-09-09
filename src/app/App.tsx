import "@/app/App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppHeader } from "@/app/AppHeader";
import { AppMain } from "@/app/AppMain";
import { useAppSelector } from "@/common/hooks/useAppSelector";

import { TaskType } from "@/features/Todolists/ui/Todolist/Todolist";
import { FilterValues } from "@/common/enums/enums";
import { selectTheme } from "./app-slice";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
  // опциональные поля из API
  addedDate?: string;
  order?: number;
};
export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function App() {
  const themeMode = useAppSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode, // 'light' или 'dark'
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

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader />
        <AppMain />
      </ThemeProvider>
    </div>
  );
}

export default App;
