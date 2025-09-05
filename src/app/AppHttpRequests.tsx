import "@/app/App.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppHeader } from "@/app/AppHeader";
import { AppMain } from "@/app/AppMain";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTheme } from "@/common/utils/app-selectors";
import { TaskType } from "@/features/Todolists/ui/Todolist/Todolist";
import { FilterValues } from "@/common/enums/enums";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};
export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function AppHttpRequests() {
  const themeMode = useAppSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode,
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

export default AppHttpRequests;
