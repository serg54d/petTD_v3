import { FilterValuesType } from "./AppWithReducers";
import { AddItemForm } from "./AddItemForm";
import { List } from "@mui/material";
import { TodolistHeader } from "./TodolistHeader";
import { EmptyList } from "./EmptyList";
import { TaskItem } from "./TaskItem";
import { FilterButtons } from "./FilterButtons";

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
  const onClickAddTaskHandler = (title: string) => {
    props.addTask(title, props.todolistId);
  };

  const changeTodolistTitleHandler = (title: string) => {
    props.changeTodolistTitle(props.todolistId, title);
  };

  return (
    <div className="todolist">
      <TodolistHeader
        title={props.title}
        onChangeTitle={changeTodolistTitleHandler}
        onDelete={() => props.deleteTodolist(props.todolistId)}
      />

      <AddItemForm addItem={onClickAddTaskHandler} />

      {props.tasks.length === 0 ? (
        <EmptyList />
      ) : (
        <List className="tasks-container">
          {props.tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChangeStatus={(taskId, newStatus) =>
                props.changeTaskStatus(taskId, props.todolistId, newStatus)
              }
              onChangeTitle={(taskId, newTitle) =>
                props.changeTaskTitle(props.todolistId, taskId, newTitle)
              }
              onRemove={(taskId) => props.removeTask(taskId, props.todolistId)}
            />
          ))}
        </List>
      )}

      <FilterButtons
        filter={props.filter}
        onChangeFilter={(newFilter) =>
          props.changeFilter(newFilter, props.todolistId)
        }
      />
    </div>
  );
};
