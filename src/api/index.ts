import {
  Login,
  LoginResponse,
  RegisterPlayer,
  RegisterPlayerResponse,
} from "../types/api.types";
import { apiClient } from "./configure";
import { ENDPOINTS } from "./endpoints";

export async function registerPlayer(data: RegisterPlayer) {
  const response = await apiClient.post<RegisterPlayerResponse>(
    ENDPOINTS.AUTH.REGISTER,
    data
  );
  return response.data;
}

export async function loginPlayer(data: Login) {
  const response = await apiClient.post<LoginResponse>(
    ENDPOINTS.AUTH.LOGIN,
    data
  );
  return response.data;
}

export function logoutPlayer() {
  localStorage.removeItem("accessToken");
}
