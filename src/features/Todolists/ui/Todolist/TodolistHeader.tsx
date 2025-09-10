import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "@/common/components";

type TodolistHeaderProps = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  onDelete: () => void;
  disabled?: boolean;
};

export const TodolistHeader = ({
  title,
  onChangeTitle,
  onDelete,
  disabled,
}: TodolistHeaderProps) => {
  return (
    <h3>
      <EditableSpan
        className=""
        onChangeTitle={onChangeTitle}
        title={title}
        disabled={disabled}
      />
      <IconButton onClick={onDelete} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </h3>
  );
};
