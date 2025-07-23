import { ChangeEvent, JSX } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  changeTaskTitle: (
    todolistId: string,
    taskId: string,
    newTitle: string
  ) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  let tasksList: JSX.Element =
    props.tasks.length === 0 ? (
      <div className="empty-list">Список пуст</div>
    ) : (
      <div className="tasks-container">
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

          const changeTaskTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(props.todolistId, task.id, newTitle);
          };

          return (
            <div
              key={task.id}
              className={`task-item ${task.isDone ? "task-done" : ""}`}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />
              <EditableSpan
                className="task-text"
                title={task.text}
                onChangeTitle={changeTaskTitleHandler}
              />

              <Button
                className="btn-danger btn-sm"
                title="×"
                onClick={removeTaskHandler}
              />
            </div>
          );
        })}
      </div>
    );

  const onClickAddTaskHandler = (title: string) => {
    props.addTask(title, props.todolistId);
  };

  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(props.todolistId, title);
  };

  return (
    <div className="todolist">
      <h3>
        <EditableSpan className="" onChangeTitle={changeTodolistTitleHandler} title={props.title} />

        <Button
          className="btn-danger"
          title="X"
          onClick={() => props.deleteTodolist(props.todolistId)}
        />
      </h3>
      <AddItemForm addItem={onClickAddTaskHandler} />
      {tasksList}
      <div className="filters">
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
