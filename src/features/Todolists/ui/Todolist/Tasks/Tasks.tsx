import List from "@mui/material/List";

import {
  changeTaskStatusTC,
  changeTaskTitleTC,
  removeTaskTC,
} from "../../../model/reducers/tasks-slice";

import { TaskType } from "@/features/Todolists/ui/Todolist/Todolist";
import { TodolistType } from "@/app/App";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TaskItem } from "@/features/Todolists/ui/Todolist/Tasks/TaskItem";
import {
  ModelUpdateType,
  tasksApi,
} from "@/features/Todolists/api/requests/tasksApi";
import { TaskStatus } from "@/features/Todolists/lib/enums";

type TasksPropsType = {
  tasks: TaskType[];
  todolist: TodolistType;
};

export const Tasks = (props: TasksPropsType) => {
  const dispatch = useAppDispatch();
  const changeTaskStatusHandler = async (
    taskId: string,
    status: TaskStatus
  ) => {
    const task = props.tasks.find((t) => t.id === taskId);
    if (!task) return;
    const model: ModelUpdateType = {
      completed: null,
      deadline: null,
      description: null,
      priority: 0,
      startDate: null,
      status,
      title: task.text,
    };
    const response = await tasksApi.updateTask(
      model,
      props.todolist.id,
      taskId
    );
    try {
      if (response.data.resultCode === 0) {
        dispatch(
          changeTaskStatusTC({ todolistId: props.todolist.id, taskId, status })
        );
      }
    } catch (error) {
      console.error("Failed to change status for task:", error);
    }
  };
  const changeTaskTitleHandler = (taskId: string, title: string) => {
    dispatch(
      changeTaskTitleTC({ todolistId: props.todolist.id, taskId, title })
    );
  };
  const removeTaskHandler = (taskId: string) => {
    dispatch(removeTaskTC({ todolistId: props.todolist.id, taskId }));
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
