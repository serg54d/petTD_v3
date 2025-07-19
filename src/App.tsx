import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const todolistTitle = "What to learn";
  //   const tasks_1: Array<TaskType> = [
  //     { id: 1, isDone: true, text: "1" },
  //     { id: 2, isDone: true, text: "2" },
  //     { id: 3, isDone: false, text: "3" },
  //   ];

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), isDone: true, text: "1" },
    { id: v1(), isDone: true, text: "2" },
    { id: v1(), isDone: false, text: "3" },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (taskId: string) => {
    const nextState: TaskType[] = tasks.filter((task) => taskId !== task.id);
    setTasks(nextState);
  };

  const changeFilter = (newFilter: FilterValuesType) => setFilter(newFilter);

  let filteredTasks: TaskType[] = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => task.isDone === false);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone === true);
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      isDone: false,
      text: title,
    };

    setTasks([...tasks, newTask]);
  };

  const changeTaskStatus = (taskId: string, newStatus: boolean) => {
    const nextState: TaskType[] = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: newStatus } : task
    );
    setTasks(nextState);
  };

  return (
    <div className="app">
      <Todolist 
        title={todolistTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
		filter={filter}
      />
    </div>
  );
}

export default App;
