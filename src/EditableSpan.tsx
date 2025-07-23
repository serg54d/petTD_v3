import { ChangeEvent, useState } from "react";

type EditableSpanType = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  className: string;
};

export const EditableSpan = ({
  title,
  onChangeTitle,
  className,
  ...props
}: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(title);
  const changeSpanHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(e.currentTarget.value);
    setText(e.currentTarget.value);
  };
  return !editMode ? (
    <span onDoubleClick={() => setEditMode(true)}>{title}</span>
  ) : (
    <input
      autoFocus
      onChange={changeSpanHandler}
      onBlur={() => {
        setEditMode(false);
      }}
      value={text}
      type="text"
    />
  );
};
