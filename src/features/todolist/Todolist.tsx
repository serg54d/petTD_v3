import { TodolistHeader } from "./TodolistHeader";
import { FilterValuesType, TodolistType } from "../../app/AppWithRedux";
import { EmptyList } from "../../common/components/EmptyList";
import { AddItemForm } from "../../common/components/AddItemForm";
import { FilterButtons } from "../../common/components/FilterButtons";
import {
  changeFilterTodolistAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
} from "../../model/reducers/todolists-reducer";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { addTaskAC } from "../../model/reducers/tasks-reducer";
import { v1 } from "uuid";
import { Tasks } from "./tasks/Tasks";

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
      addTaskAC({ todolistId: props.todolist.id, text: title, taskId: v1() })
    );
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ id: props.todolist.id, newTitle: title }));
  };
  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC(props.todolist.id));
  };

  const changeTodolistFilterHandler = (newFilter: FilterValuesType) => {
    dispatch(changeFilterTodolistAC({ newFilter, id: props.todolist.id }));
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
