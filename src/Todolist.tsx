import { JSX } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";

export type TasksType = {
  id: number;
  isDone: boolean;
  text: string;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TasksType>;
  removeTask: (taskId: number) => void;
  changeFilter: (newFilter: FilterValuesType) => void;
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
              <Button title={"X"} onClick={() => props.removeTask(task.id)} />
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
        <Button title={"+"} />
      </div>
      {tasksList}
      <div>
        <Button title="All" onClick={() => props.changeFilter("all")} />
        <Button title="Active" onClick={() => props.changeFilter("active")} />
        <Button
          title="Completed"
          onClick={() => props.changeFilter("completed")}
        />
      </div>
    </div>
  );
};
