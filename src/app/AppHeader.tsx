import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MaterialUISwitch } from "@/common/components";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { changeThemeModeAC, selectTheme } from "@/app/app-slice";

export type ThemeMode = "dark" | "light";

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectTheme);
  const handleThemeToggle = () => {
    dispatch(changeThemeModeAC({ themeMode }));
  };
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
          <Button color="inherit">Login</Button>
          <MaterialUISwitch
            checked={themeMode === "dark"}
            onChange={handleThemeToggle}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
