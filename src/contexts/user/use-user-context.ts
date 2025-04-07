import { useContext } from "react";
import { UserContext } from "./user.context";

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
