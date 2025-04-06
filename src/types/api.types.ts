export type RegisterPlayer = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterPlayerResponse = {
  id: string;
  name: string;
};

export type Login = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accessToken: string;
};

export type Bet = {
  amount: number;
};

export type BetResponse = {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number;
};

export type MyBetsResponse = {
  id: string;
  createdAt: string;
  amount: number;
  winAmount: number;
  status: string;
};

export type MyTransactionResponse = {
  id: string;
  createdAt: string;
  amount: number;
  type: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type BetsQueryParams = PaginationParams & {
  status?: string;
  id?: string;
};

export type TransactionsQueryParams = PaginationParams & {
  type?: string;
  id?: string;
};

export type PaginateResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type CancelBetResponse = {
  transactionId: string;
  balance: number;
  currency: string;
};
