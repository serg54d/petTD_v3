import List from "@mui/material/List";

import {
  changeTaskStatus,
  changeTaskTitle,
  removeTask,
} from "../../model/reducers/tasks-reducer";

import { TaskType } from "@/features/todolist/Todolist/Todolist";
import { TodolistType } from "@/app/AppWithRedux";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TaskItem } from "@/features/todolist/Todolist/Tasks/TaskItem";

type TasksPropsType = {
  tasks: TaskType[];
  todolist: TodolistType;
};

export const Tasks = (props: TasksPropsType) => {
  const dispatch = useAppDispatch();
  const changeTaskStatusHandler = (taskId: string, status: boolean) => {
    dispatch(
      changeTaskStatus({ todolistId: props.todolist.id, taskId, status })
    );
  };
  const changeTaskTitleHandler = (taskId: string, title: string) => {
    dispatch(changeTaskTitle({ todolistId: props.todolist.id, taskId, title }));
  };
  const removeTaskHandler = (taskId: string) => {
    dispatch(removeTask({ todolistId: props.todolist.id, taskId }));
  };
  return (
    <List className="tasks-container">
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onChangeStatus={changeTaskStatusHandler}
          onChangeTitle={changeTaskTitleHandler}
          onRemove={removeTaskHandler}
        />
      ))}
    </List>
  );
};
