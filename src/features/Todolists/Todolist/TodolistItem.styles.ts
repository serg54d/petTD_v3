import { SxProps } from "@mui/material/styles";

export const getListItemSx = (isDone: boolean): SxProps => ({
  p: 1,
  mb: 1,
  borderRadius: "var(--border-radius)",
  bgcolor: "background.paper",
  opacity: isDone ? 0.7 : 1,
  textDecoration: isDone ? "line-through" : "none",
  "&:hover": {
    boxShadow: "var(--box-shadow)",
  },
});
