import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CustomButton, MaterialUISwitch } from "@/common/components";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {
  changeThemeModeAC,
  selectLoadingGetStatus,
  selectTheme,
} from "@/app/app-slice";
import LinearProgress from "@mui/material/LinearProgress";
import { logoutTC, selectAuth } from "@/features/auth/model/auth-slice";

export type ThemeMode = "dark" | "light";

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectTheme);
  const loadGetStatus = useAppSelector(selectLoadingGetStatus);
  const handleThemeToggle = () => {
    dispatch(changeThemeModeAC({ themeMode }));
  };
  const { isLoggedIn } = useAppSelector(selectAuth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          {isLoggedIn ? (
            <CustomButton onClick={() => dispatch(logoutTC())}>
              Logout
            </CustomButton>
          ) : (
            <CustomButton>Login</CustomButton>
          )}

          <MaterialUISwitch
            checked={themeMode === "dark"}
            onChange={handleThemeToggle}
          />
        </Toolbar>
        {loadGetStatus === "pending" && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
