import { TodolistType } from "@/app/App";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTask } from "@/features/Todolists/model/reducers/tasks-slice";
import { nanoid } from "@reduxjs/toolkit";
import { AddItemForm } from "@/common/components/AddItemForm";
import { EmptyList } from "@/common/components";
import { FilterButtons } from "@/common/components/FilterButtons";
import { TodolistHeader } from "./TodolistHeader";
import { Tasks } from "@/features/Todolists/ui/Todolist/Tasks/Tasks";
import { tasksApi } from "../../api/requests/tasksApi";
import { todolistsApi } from "../../api/requests/todolistsApi";
import { TaskStatus } from "../../lib/enums";
import { FilterValues } from "@/common/enums/enums";
import {
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
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
  const createTaskHandler = async (title: string) => {
    const response = await tasksApi.createTask(props.todolist.id, title);
    try {
      if (response.data.resultCode === 0) {
        dispatch(
          addTask({
            todolistId: props.todolist.id,
            text: title,
            taskId: nanoid(),
            status: TaskStatus.Active,
          })
        );
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const changeTodolistTitleHandler = async (title: string) => {
    const response = await todolistsApi.changeTodolistTitle(
      title,
      props.todolist.id
    );
    try {
      if (response.data.resultCode === 0) {
        dispatch(
          changeTodolistTitle({ id: props.todolist.id, newTitle: title })
        );
      }
    } catch (error) {
      console.error("Failed to change title for todolist:", error);
    }
  };
  const deleteTodolistHandler = async () => {
    const response = await todolistsApi.removeTodolist(props.todolist.id);
    try {
      if (response.data.resultCode === 0) {
        dispatch(deleteTodolist({ id: props.todolist.id }));
      }
    } catch (error) {
      console.error("Failed to delete todolist:", error);
    }
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
      />

      <AddItemForm addItem={createTaskHandler} />

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
