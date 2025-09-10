import { useState, KeyboardEvent } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

type AddItemFormProps = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

const MAX_TITLE_LENGTH = 15;

export const AddItemForm = ({ addItem, disabled }: AddItemFormProps) => {
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
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          value={itemTitle}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          label={`Add text (max ${MAX_TITLE_LENGTH} chars)`}
          variant="outlined"
          fullWidth
          size="small"
          error={!!inputError}
          color="secondary"
          disabled={disabled}
        />
        <IconButton
          onClick={handleAddItem}
          color={isTitleLengthValid && !inputError ? "primary" : "error"}
        >
          <AddTaskIcon />
        </IconButton>
      </Box>
      {!isTitleLengthValid && (
        <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
          Maximum length is {MAX_TITLE_LENGTH} characters
        </Box>
      )}
      {inputError && (
        <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 0.5 }}>
          Title is required
        </Box>
      )}
    </Box>
  );
};
