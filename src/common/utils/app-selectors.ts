import { ThemeMode } from "../../app/AppHeader";
import { RootState } from "../../app/store";

export const selectTheme = (state: RootState): ThemeMode => state.app.theme;
