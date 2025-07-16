import { JSX } from "react";
import { Button } from "./Button";

export type TasksType = {
  id: number;
  isDone: boolean;
  text: string;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: number) => void;
};

export const Todolist = (props: TodolistPropsType) => {


  let tasksList: JSX.Element =
    props.tasks.length === 0 ? (
      <div>Список пуст</div>
    ) : (
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.text}</span>
              <button onClick={() => props.removeTask(task.id)}>delete</button>
            </li>
          );
        })}
      </ul>
    );

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasksList}
      <div>
        <Button title="All" />
        <Button title="Active" />
        <Button title="Completed" />
      </div>
    </div>
  );
};
