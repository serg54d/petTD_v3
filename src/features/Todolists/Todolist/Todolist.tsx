import { FilterValuesType, TodolistType } from "@/app/AppWithRedux";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { addTask } from "@/features/Todolists/model/reducers/tasks-reducer";
import {
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
} from "@/features/Todolists/model/reducers/todolists-reducer";
import { nanoid } from "@reduxjs/toolkit";
import { TodolistHeader } from "@/features/todolist/Todolist/TodolistHeader";
import { AddItemForm } from "@/common/components/AddItemForm";
import { EmptyList } from "@/common/components/EmptyList";
import { Tasks } from "@/features/todolist/Todolist/Tasks/Tasks";
import { FilterButtons } from "@/common/components/FilterButtons";

export type TaskType = {
  id: string;
  isDone: boolean;
  text: string;
};

export type TodolistPropsType = {
  todolist: TodolistType;

  tasks: Array<TaskType>;
  //   removeTask: (taskId: string, todolistId: string) => void;
  //   changeFilter: (newFilter: FilterValuesType, todolistId: string) => void;
  //   addTask: (title: string, todolistId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const dispatch = useAppDispatch();
  const onClickAddTaskHandler = (title: string) => {
    dispatch(
      addTask({ todolistId: props.todolist.id, text: title, taskId: nanoid() })
    );
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ id: props.todolist.id, newTitle: title }));
  };
  const deleteTodolistHandler = () => {
    let todolistId = props.todolist.id;
    dispatch(deleteTodolist({ id: todolistId }));
  };

  const changeTodolistFilterHandler = (newFilter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ newFilter, id: props.todolist.id }));
  };

  return (
    <div className="todolist">
      <TodolistHeader
        title={props.todolist.title}
        onChangeTitle={changeTodolistTitleHandler}
        onDelete={deleteTodolistHandler}
      />

      <AddItemForm addItem={onClickAddTaskHandler} />

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
