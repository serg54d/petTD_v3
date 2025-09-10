import { TodolistType } from "@/app/App";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTaskTC } from "@/features/Todolists/model/reducers/tasks-slice";
import { nanoid } from "@reduxjs/toolkit";
import { AddItemForm } from "@/common/components/AddItemForm";
import { EmptyList } from "@/common/components";
import { FilterButtons } from "@/common/components/FilterButtons";
import { TodolistHeader } from "./TodolistHeader";
import { Tasks } from "@/features/Todolists/ui/Todolist/Tasks/Tasks";
import { TaskStatus } from "../../lib/enums";
import { FilterValues } from "@/common/enums/enums";
import {
  changeTodolistFilter,
  changeTodolistTitleTC,
  deleteTodolistTC,
} from "../../model/reducers/todolists-slice";

export type TaskType = {
  id: string;
  isDone: TaskStatus;
  text: string;
};

export type TodolistPropsType = {
  todolist: TodolistType;
  tasks: Array<TaskType>;
};

export const Todolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch();
  const createTaskHandler = (title: string) => {
    dispatch(
      addTaskTC({
        todolistId: props.todolist.id,
        text: title,
        taskId: nanoid(),
        status: TaskStatus.Active,
      })
    );
  };

  const changeTodolistTitleHandler = async (title: string) => {
    dispatch(changeTodolistTitleTC({ id: props.todolist.id, newTitle: title }));
  };
  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id: props.todolist.id }));
  };

  const changeTodolistFilterHandler = (newFilter: FilterValues) => {
    dispatch(changeTodolistFilter({ newFilter, id: props.todolist.id }));
  };

  return (
    <div className="todolist">
      <TodolistHeader
        title={props.todolist.title}
        onChangeTitle={changeTodolistTitleHandler}
        onDelete={deleteTodolistHandler}
        disabled={props.todolist.entityStatus === "pending"}
      />

      <AddItemForm
        addItem={createTaskHandler}
        disabled={props.todolist.entityStatus === "pending"}
      />

      {props.tasks.length === 0 ? (
        <EmptyList />
      ) : (
        <Tasks tasks={props.tasks} todolist={props.todolist} />
      )}

      <FilterButtons
        filter={props.todolist.filter}
        onChangeFilter={(newFilter) => changeTodolistFilterHandler(newFilter)}
      />
    </div>
  );
};
