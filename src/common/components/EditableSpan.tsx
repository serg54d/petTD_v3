import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type EditableSpanType = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  className?: string;
};

export const EditableSpan = ({
  title,
  onChangeTitle,
  className = "",
}: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(title);

  const changeSpanHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(e.currentTarget.value);
    setText(e.currentTarget.value);
  };

  return !editMode ? (
    <span
      className={`${className} task-text`}
      onDoubleClick={() => setEditMode(true)}
    >
      {title}
    </span>
  ) : (
    <TextField
      autoFocus
      onChange={changeSpanHandler}
      onBlur={() => {
        setEditMode(false);
      }}
      value={text}
      size="small"
      label="Edit"
      variant="outlined"
    />
  );
};
