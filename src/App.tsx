import { useState } from "react";
import "./App.css";
import { TasksType, Todolist } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const todolistTitle = "What to learn";
  //   const tasks_1: Array<TasksType> = [
  //     { id: 1, isDone: true, text: "1" },
  //     { id: 2, isDone: true, text: "2" },
  //     { id: 3, isDone: false, text: "3" },
  //   ];

  const [tasks, setTasks] = useState<TasksType[]>([
    { id: 1, isDone: true, text: "1" },
    { id: 2, isDone: true, text: "2" },
    { id: 3, isDone: false, text: "3" },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (taskId: number) => {
    const nextState: TasksType[] = tasks.filter((task) => taskId !== task.id);
    setTasks(nextState);
  };

  const changeFilter = (newFilter: FilterValuesType) => setFilter(newFilter);

  let filteredTasks: TasksType[] = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => task.isDone === false);
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone === true);
  }

  return (
    <div className="app">
      <Todolist
        title={todolistTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
