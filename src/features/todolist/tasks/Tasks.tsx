import List from "@mui/material/List";
import { TaskItem } from "./TaskItem";
import { TaskType } from "../Todolist";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../../model/reducers/tasks-reducer";
import { TodolistType } from "../../../app/AppWithRedux";

type TasksPropsType = {
  tasks: TaskType[];
  todolist: TodolistType;
};

export const Tasks = (props: TasksPropsType) => {
  const dispatch = useAppDispatch();
  const changeTaskStatusHandler = (taskId: string, status: boolean) => {
    dispatch(
      changeTaskStatusAC({ todolistId: props.todolist.id, taskId, status })
    );
  };
  const changeTaskTitleHandler = (taskId: string, title: string) => {
    dispatch(
      changeTaskTitleAC({ todolistId: props.todolist.id, taskId, title })
    );
  };
  const removeTaskHandler = (taskId: string) => {
    dispatch(removeTaskAC({ todolistId: props.todolist.id, taskId }));
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
