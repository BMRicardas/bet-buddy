import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth.context";

interface BalanceContextType {
  balance: number;
  updateBalance: (newBalance: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(user?.balance || 0);

  useEffect(() => {
    if (user) {
      setBalance(user.balance);
    }
  }, [user]);

  const updateBalance = (newBalance: number) => {
    setBalance(() => newBalance);
  };

  const value = {
    balance,
    updateBalance,
  };

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}
