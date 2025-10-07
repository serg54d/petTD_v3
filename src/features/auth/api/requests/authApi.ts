import { instance } from "@/common/instance/instance";
import { BaseAuthResponse } from "../types/authApi.types";
import { LoginInputs } from "../../lib/schemas/loginSchema";




export const authApi = {
  login: (payload: LoginInputs) => {
    return instance.post<BaseAuthResponse<{ userId: string; token: string }>>(
      `/auth/login`,
      {
        ...payload,
      }
    );
  },
  me: () => {
    return instance.get<
      BaseAuthResponse<{
        id: string;
        email: string;
        login: string;
        token: string;
      }>
    >(`/auth/me`);
  },
  logout: () => {
    return instance.delete<BaseAuthResponse>(`/auth/login`);
  },
};
