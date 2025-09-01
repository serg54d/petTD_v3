import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "@/common/components/EditableSpan";


type TodolistHeaderProps = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  onDelete: () => void;
};

export const TodolistHeader = ({
  title,
  onChangeTitle,
  onDelete,
}: TodolistHeaderProps) => {
  return (
    <h3>
      <EditableSpan className="" onChangeTitle={onChangeTitle} title={title} />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </h3>
  );
};
