import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

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
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: todolistId_1,
      filter: "all",
      title: "Todolist-1",
    },
    {
      id: todolistId_2,
      filter: "all",
      title: "Todolist-2",
    },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), isDone: true, text: "1" },
      { id: v1(), isDone: true, text: "2" },
      { id: v1(), isDone: false, text: "3" },
    ],
    [todolistId_2]: [
      { id: v1(), isDone: false, text: "1" },
      { id: v1(), isDone: false, text: "2" },
      { id: v1(), isDone: false, text: "3" },
      { id: v1(), isDone: true, text: "4" },
    ],
  });

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => taskId !== task.id),
    });
  };

  const changeFilter = (newFilter: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId
          ? { ...todolist, filter: newFilter }
          : todolist
      )
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      isDone: false,
      text: title,
    };

    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  const changeTaskStatus = (
    taskId: string,
    todolistId: string,
    newStatus: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone: newStatus } : task
      ),
    });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    delete tasks[todolistId];
  };

  const addTodolist = (title: string) => {
    const todolistId = v1();
    const newTodolist: TodolistType = {
      filter: "all",
      id: todolistId,
      title,
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    newTitle: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, text: newTitle } : task
      ),
    });
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title: newTitle } : todolist
      )
    );
  };
  return (
    <div className="app">
      <div className="app-header">
        <h1>TODO App</h1>
        <AddItemForm addItem={addTodolist} />
      </div>
      <div className="todolists-container">
        {todolists.map((todolist) => {
          let filteredTasks = tasks[todolist.id];
          if (todolist.filter === "active") {
            filteredTasks = filteredTasks.filter(
              (task) => task.isDone === false
            );
          } else if (todolist.filter === "completed") {
            filteredTasks = filteredTasks.filter(
              (task) => task.isDone === true
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
    </div>
  );
}

export default App;
