import { useState, KeyboardEvent } from "react";
import { Button } from "./Button";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

const MAX_TITLE_LENGTH = 15;

export const AddItemForm = ({ addItem }: AddItemFormProps) => {
  const [itemTitle, setItemTitle] = useState("");
  const [inputError, setInputError] = useState(false);

  const isTitleLengthValid = itemTitle.trim().length <= MAX_TITLE_LENGTH;

  const handleAddItem = () => {
    const trimmedTitle = itemTitle.trim();

    if (trimmedTitle.length === 0) {
      setInputError(true);
      return;
    }

    if (!isTitleLengthValid) return;

    addItem(trimmedTitle);
    setItemTitle("");
    setInputError(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddItem();
  };

  const handleInputChange = (value: string) => {
    if (inputError && value.trim().length > 0) {
      setInputError(false);
    }
    setItemTitle(value);
  };

  return (
    <div className="add-item-form">
      <div className="form-control">
        <input
          className={`task-input ${inputError ? "input-error" : ""}`}
          placeholder={`Add text (max ${MAX_TITLE_LENGTH} chars)`}
          value={itemTitle}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="add-button"
          onClick={handleAddItem}
          title={"Add"}
          isDisabled={!isTitleLengthValid}
        />
      </div>
      {!isTitleLengthValid && (
        <div className="error-message">
          Maximum length is {MAX_TITLE_LENGTH} characters
        </div>
      )}
      {inputError && <div className="error-message">Title is required</div>}
    </div>
  );
};
