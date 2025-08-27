import { ThemeMode } from "./AppHeader";


type ToogleModeActionType = ReturnType<typeof toogleModeAC>;

type AppReducerType = ToogleModeActionType;

export type AppStateType = {
  theme: ThemeMode;
};

// AC

export const toogleModeAC = (theme: ThemeMode) => {
  return {
    type: "TOOGLE-MODE",
    payload: {
      theme,
    },
  } as const;
};

// Reducer

const initialState: AppStateType = {
  theme: "light", // начальная тема
};

export const appReducer = (
  state: AppStateType = initialState,
  action: AppReducerType
): AppStateType => {
  switch (action.type) {
    case "TOOGLE-MODE": {
      return {
        ...state,
        theme: action.payload.theme === "light" ? "dark" : "light",
      };
    }
    default:
      return state;
  }
};
