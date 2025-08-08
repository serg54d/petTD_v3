import { JSX, useRef } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./AppWithReducers";

export type TaskType = {
  id: string;
  isDone: boolean;
  text: string;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (newFilter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onClickAddTaskHandler = () => {
    if (inputRef.current) {
      if (inputRef.current.value.length <= 15) {
        props.addTask(inputRef.current.value);
        inputRef.current.value = "";
      } else {
        alert("to long");
      }
    }
  };

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input ref={inputRef} />
        <Button onClick={onClickAddTaskHandler} title={"+"} />
        <div>max length is 15 characters</div>
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
