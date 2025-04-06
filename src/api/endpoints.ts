export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
  },
  BET: {
    PLACE_BET: "/bet",
    MY_BETS: "/my-bets",
    CANCEL_BET: (id: string) => `/my-bet/${id}`,
  },
  WALLET: {
    MY_TRANSACTIONS: "/my-transactions",
  },
};
