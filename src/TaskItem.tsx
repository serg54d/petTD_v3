import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "./EditableSpan";
import { ListItem } from "@mui/material";
import { getListItemSx } from "./TodolistItem.styles";

type TaskItemProps = {
  task: {
    id: string;
    isDone: boolean;
    text: string;
  };
  onChangeStatus: (taskId: string, newStatus: boolean) => void;
  onChangeTitle: (taskId: string, newTitle: string) => void;
  onRemove: (taskId: string) => void;
};

export const TaskItem = ({
  task,
  onChangeStatus,
  onChangeTitle,
  onRemove,
}: TaskItemProps) => {
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeStatus(task.id, e.currentTarget.checked);
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    onChangeTitle(task.id, newTitle);
  };

  const removeTaskHandler = () => {
    onRemove(task.id);
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
      <EditableSpan
        className="task-text"
        title={task.text}
        onChangeTitle={changeTaskTitleHandler}
      />
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
