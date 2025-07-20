import { ChangeEvent, JSX, useState } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  isDone: boolean;
  text: string;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (newFilter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    todolistId: string,
    newStatus: boolean
  ) => void;
  filter: FilterValuesType;
  todolistId: string;
  deleteTodolist: (todolistId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inputError, setInputError] = useState<boolean>(false);
  const isTitleLengthValid = taskTitle.trim().length <= 15;

  let tasksList: JSX.Element =
    props.tasks.length === 0 ? (
      <div>Список пуст</div>
    ) : (
      <ul>
        {props.tasks.map((task) => {
          const removeTaskHandler = () => {
            props.removeTask(task.id, props.todolistId);
          };
          const changeTaskStatusHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            props.changeTaskStatus(
              task.id,
              props.todolistId,
              e.currentTarget.checked
            );
          };
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />{" "}
              <span className={task.isDone ? "task-done" : "task"}>
                {task.text}
              </span>
              <Button title={"X"} onClick={removeTaskHandler} />
            </li>
          );
        })}
      </ul>
    );

  const onClickAddTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      if (isTitleLengthValid) {
        props.addTask(taskTitle.trim(), props.todolistId);
        setTaskTitle("");
      }
    } else {
      setInputError(true);
    }
    setTaskTitle("");
  };

  const onKeyDownAddTaskHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      onClickAddTaskHandler();
    }
  };

  return (
    <div className="todolist">
      <h3>{props.title}
		<Button title="X" onClick={() => {props.deleteTodolist(props.todolistId)}}/>
	  </h3>
      <div>
        <input
          className={inputError ? "input-error" : ""}
          placeholder="max 15 characters"
          value={taskTitle}
          onChange={(e) => {
            inputError && setInputError(false);
            setTaskTitle(e.currentTarget.value);
          }}
          onKeyDown={onKeyDownAddTaskHandler}
        />
        <Button
          onClick={onClickAddTaskHandler}
          title={"+"}
          isDisabled={!isTitleLengthValid}
        />
        {!isTitleLengthValid && (
          <div style={{ color: "red" }}>max length is 15 characters</div>
        )}
        {inputError && <div style={{ color: "red" }}>title is required</div>}
      </div>
      {tasksList}
      <div>
        <Button
          className={props.filter === "all" ? "btn-filter-active" : ""}
          title="All"
          onClick={() => props.changeFilter("all", props.todolistId)}
        />
        <Button
          className={props.filter === "active" ? "btn-filter-active" : ""}
          title="Active"
          onClick={() => props.changeFilter("active", props.todolistId)}
        />
        <Button
          className={props.filter === "completed" ? "btn-filter-active" : ""}
          title="Completed"
          onClick={() => props.changeFilter("completed", props.todolistId)}
        />
      </div>
    </div>
  );
};
