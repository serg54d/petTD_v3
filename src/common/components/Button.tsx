import Button from "@mui/material/Button";
import { ReactNode } from "react";

type CustomButtonProps = {
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  disabled?: boolean;
};

export const CustomButton = ({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  onClick,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
