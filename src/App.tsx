import { useState } from "react";
import "./App.css";
import { TasksType, Todolist } from "./Todolist";

function App() {
  const todolistTitle_1 = "What to learn";
  //   const tasks_1: Array<TasksType> = [
  //     { id: 1, isDone: true, text: "1" },
  //     { id: 2, isDone: true, text: "2" },
  //     { id: 3, isDone: false, text: "3" },
  //   ];

  const [tasks, setTasks] = useState([
    { id: 1, isDone: true, text: "1" },
    { id: 2, isDone: true, text: "2" },
    { id: 3, isDone: false, text: "3" },
  ]);

  const removeTask = (taskId: number) => {
    const nextState: TasksType[] = tasks.filter((task) => taskId !== task.id);
    setTasks(nextState);
  };

  return (
    <div className="app">
      <Todolist title={todolistTitle_1} tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
