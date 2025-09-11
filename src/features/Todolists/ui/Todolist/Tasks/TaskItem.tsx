import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { ListItem } from "@mui/material";

import { EditableSpan } from "@/common/components";
import { getListItemSx } from "../TodolistItem.styles";
import { TaskStatus } from "@/features/Todolists/lib/enums";

type TaskItemProps = {
  task: {
    id: string;
    isDone: TaskStatus;
    text: string;
  };
  onChangeStatus: (taskId: string, newStatus: TaskStatus) => void;
  onChangeTitle: (taskId: string, newTitle: string) => void;
  onRemove: (taskId: string) => void;
  disabled: boolean;
};

export const TaskItem = ({
  task,
  onChangeStatus,
  onChangeTitle,
  onRemove,
  disabled,
}: TaskItemProps) => {
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.Active;
    onChangeStatus(task.id, status);
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    onChangeTitle(task.id, newTitle);
  };

  const removeTaskHandler = () => {
    onRemove(task.id);
  };
  const isChecked = task.isDone === TaskStatus.Completed;
  return (
    <ListItem key={task.id} sx={getListItemSx(isChecked)}>
      <Checkbox
        checked={isChecked}
        onChange={changeTaskStatusHandler}
        disabled={disabled}
      />
      <EditableSpan
        className="task-text"
        title={task.text}
        onChangeTitle={changeTaskTitleHandler}
        disabled={disabled}
      />
      <IconButton
        aria-label="delete"
        onClick={removeTaskHandler}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
