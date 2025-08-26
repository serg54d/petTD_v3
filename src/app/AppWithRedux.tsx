import "./App.css";
import { TaskType, Todolist } from "../features/todolist/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "../common/components/AddItemForm";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MaterialUISwitch } from "../common/components/SwitchTheme";
import {
  addTodolistAC,
  changeFilterTodolistAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
} from "../model/reducers/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../model/reducers/tasks-reducer";

import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { RootState } from "./store";
import { toogleModeAC } from "./app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

export type ThemeMode = "dark" | "light";
const selectTheme = (state: RootState): ThemeMode => state.app.theme;

function App() {
  const dispatch = useAppDispatch();

  const todolists = useAppSelector((state) => state.todolists);
  const tasks = useAppSelector((state) => state.tasks);
  const themeMode = useAppSelector(selectTheme);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleThemeToggle = () => {
    dispatch(toogleModeAC(themeMode));
  };

  // tasks

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ todolistId, taskId }));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ todolistId, text: title, taskId: v1() }));
  };

  const changeTaskStatus = (
    taskId: string,
    todolistId: string,
    newStatus: boolean
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, status: newStatus }));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    newTitle: string
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title: newTitle }));
  };

  //todolist

  const changeFilter = (newFilter: FilterValuesType, todolistId: string) => {
    dispatch(changeFilterTodolistAC({ newFilter, id: todolistId }));
  };
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId));
  };

  const addTodolist = (title: string) => {
    const todolistId = v1();
    const action = addTodolistAC({ title: title, id: todolistId });
    dispatch(action);
  };
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, newTitle }));
  };
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Todo
              </Typography>
              <Button color="inherit">Login</Button>
              <MaterialUISwitch
                checked={themeMode === "dark"}
                onChange={handleThemeToggle}
              />
            </Toolbar>
          </AppBar>
        </Box>
        <div className="app_add-todolist">
          <AddItemForm addItem={addTodolist} />
        </div>
        <div className="todolists-container">
          {todolists.map((todolist) => {
            let filteredTasks = tasks[todolist.id];
            if (todolist.filter === "active") {
              filteredTasks = filteredTasks.filter(
                (task: TaskType) => task.isDone === false
              );
            } else if (todolist.filter === "completed") {
              filteredTasks = filteredTasks.filter(
                (task: TaskType) => task.isDone === true
              );
            }
            return (
              <Todolist
                key={todolist.id}
                title={todolist.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={todolist.filter}
                todolistId={todolist.id}
                deleteTodolist={deleteTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
              />
            );
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
