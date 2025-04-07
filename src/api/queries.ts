import {
  Bet,
  BetResponse,
  BetsQueryParams,
  CancelBetResponse,
  Login,
  LoginResponse,
  MyBetsResponse,
  MyTransactionResponse,
  PaginateResponse,
  RegisterPlayer,
  RegisterPlayerResponse,
  TransactionsQueryParams,
} from "../types/api.types";
import { apiClient } from "./configure";
import { ENDPOINTS } from "./endpoints";

// export const authApi = {
//   register: async (data: RegisterPlayer) => {
//     const response = await apiClient.post<RegisterPlayerResponse>(
//       ENDPOINTS.AUTH.REGISTER,
//       data
//     );
//     return response.data;
//   },
// };

export function getUser(): LoginResponse | null {
  const response = localStorage.getItem("user");
  return response ? JSON.parse(response) : null;
}

function updateUserBalance(balance: number) {
  const user = getUser();
  if (user) {
    user.balance = balance;
    localStorage.setItem("user", JSON.stringify(user));
  }
}

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

  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export function logoutPlayer() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  apiClient.defaults.headers.common.Authorization = undefined;
  return Promise.resolve();
}

export async function getMyBets(data: BetsQueryParams) {
  const response = await apiClient.get<PaginateResponse<MyBetsResponse>>(
    ENDPOINTS.BET.MY_BETS,
    { params: data }
  );
  return response.data;
}

export async function placeBet(data: Bet) {
  const response = await apiClient.post<BetResponse>(
    ENDPOINTS.BET.PLACE_BET,
    data
  );

  updateUserBalance(response.data.balance);

  return response.data;
}

export async function cancelBet(id: string) {
  const response = await apiClient.delete<CancelBetResponse>(
    ENDPOINTS.BET.CANCEL_BET(id)
  );

  updateUserBalance(response.data.balance);

  return response.data;
}

export async function getMyTransactions(data: TransactionsQueryParams) {
  const response = await apiClient.get<PaginateResponse<MyTransactionResponse>>(
    ENDPOINTS.WALLET.MY_TRANSACTIONS,
    { params: data }
  );
  return response.data;
}
