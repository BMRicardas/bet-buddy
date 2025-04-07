import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "./user.context";
import { getUser } from "@/api/queries";

export function UserProvider({ children }: { children: ReactNode }) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });

  const value = {
    user,
    isLoading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
