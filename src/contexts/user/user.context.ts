import { createContext } from "react";
import { LoginResponse } from "@/types/api.types";

type UserContextType = {
  user?: LoginResponse | null;
  isLoading: boolean;
  error: unknown;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
