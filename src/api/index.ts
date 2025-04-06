import {
  Bet,
  BetResponse,
  BetsQueryParams,
  Login,
  LoginResponse,
  MyBetsResponse,
  PaginateResponse,
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
  localStorage.removeItem("user");
  apiClient.defaults.headers.common.Authorization = undefined;
}

export async function placeBet(data: Bet) {
  const response = await apiClient.post<BetResponse>(
    ENDPOINTS.BET.PLACE_BET,
    data
  );
  return response.data;
}

export async function getMyBets({ page, limit, status, id }: BetsQueryParams) {
  const response = await apiClient.get<PaginateResponse<MyBetsResponse>>(
    ENDPOINTS.BET.MY_BETS,
    { params: { page, limit, status, id } }
  );
  return response.data;
}
