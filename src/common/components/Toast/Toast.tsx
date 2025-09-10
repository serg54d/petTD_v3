import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { toastSelector } from "./toast-slice";
import { useEffect } from "react";

export type ToastStatusType =
  | "error"
  | "info"
  | "warning"
  | "success"
  | "noActive";

export type ToastType = {
  status: ToastStatusType;
  notification: string;
};

export default function Toast() {
  //   debugger;
  const toast = useAppSelector(toastSelector);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (toast.status !== "noActive") {
      setOpen(true);
    }
  }, [toast.status]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (toast.status === "noActive") {
    return;
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toast.status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.notification}
        </Alert>
      </Snackbar>
    </div>
  );
}
