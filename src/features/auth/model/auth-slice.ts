import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/requests/authApi";
import {
  handleHttpError,
  handleResultError,
  showInfoToast,
  showSuccessToast,
} from "@/common/utils/apiResponseHandlers";
import { ResultCode } from "@/features/Todolists/lib/enums";
import { RootState } from "@/app/store";
import { LoginInputs } from "../lib/schemas/loginSchema";

export interface LoginType {
  isLoggedIn: boolean | undefined;
}

const initialState: LoginType = { isLoggedIn: undefined };

export const selectAuth = (state: RootState): LoginType => state.auth;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(meTC.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(meTC.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
  },
  reducers: (create) => ({}),
});

export const authReducer = authSlice.reducer;

export const loginTC = createAsyncThunk(
  `${authSlice.name}/login`,
  async (payload: LoginInputs, thunkAPI) => {
    try {
      showInfoToast(thunkAPI, "Login in progress");
      const res = await authApi.login(payload);
      if (res.data.resultCode === ResultCode.Success) {
        showSuccessToast(thunkAPI, "Login completed");
        localStorage.setItem("authToken", `${res.data.data.token}`);
      } else {
        return handleResultError(
          thunkAPI,
          res.data,
          "Incorrect login or password"
        );
      }
    } catch (error) {
      return handleHttpError(thunkAPI, error, "Login error");
    }
  }
);

export const meTC = createAsyncThunk(
  `${authSlice.name}/me`,
  async (thunkAPI) => {
    try {
      const res = await authApi.me();
      if (res.data.resultCode === ResultCode.Success) {
      } else {
        return handleResultError(thunkAPI, res.data, "Login error");
      }
    } catch (error) {
      return handleHttpError(thunkAPI, error, "Login error");
    }
  }
);

export const logoutTC = createAsyncThunk(
  `${authSlice.name}/logout`,
  async (thunkAPI) => {
    try {
      const res = await authApi.logout();
      if (res.data.resultCode === ResultCode.Success) {
        localStorage.removeItem("authToken");
      } else {
        return handleResultError(thunkAPI, res.data, "Logout error");
      }
    } catch (error) {
      return handleHttpError(thunkAPI, error, "Logout error");
    }
  }
);
