import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { changeToast, toastSelector } from "./toast-slice";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";

export type ToastStatusType =
  | "error"
  | "info"
  | "warning"
  | "success"
  | "noActive"
  | "infoWithCanceled"
  | "canceled";

export type ToastType = {
  status: ToastStatusType;
  notification: string;
};

export default function Toast() {
  //   debugger;
  const dispatch = useAppDispatch();
  const toast = useAppSelector(toastSelector);

  const [open, setOpen] = React.useState(false);
  const autoHideDuration = toast.status === "info" ? null : 6000;

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

  const changeStatusCancelHandler = () => {
    dispatch(
      changeToast({
        status: "canceled",
        notification: "Cancellation completed",
      })
    );
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            toast.status === "error" ||
            toast.status === "info" ||
            toast.status === "success" ||
            toast.status === "warning"
              ? toast.status
              : undefined
          }
          className={toast.status === "canceled" ? "alert-cancel" : undefined}
          variant="filled"
          sx={{ width: "100%" }}
          icon={
            toast.status === "info" ? (
              <CircularProgress size={20} color="inherit" />
            ) : undefined
          }
        >
          {toast.notification}

          {toast.status === "infoWithCanceled" ? (
            <Button
              onClick={changeStatusCancelHandler}
              sx={{ color: "#fff", marginLeft: "10px" }}
              size="small"
            >
              Cancel
            </Button>
          ) : undefined}
        </Alert>
      </Snackbar>
    </div>
  );
}
