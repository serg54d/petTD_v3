import "./App.css";
import { TaskType } from "../features/todolist/Todolist";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { AppHeader } from "./AppHeader";
import { AppMain } from "./AppMain";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { selectTheme } from "../common/utils/app-selectors";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function App() {
  const themeMode = useAppSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  //todolist

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
