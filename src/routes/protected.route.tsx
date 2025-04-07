import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../contexts/user/use-user-context";

type Props = {
  redirectTo?: string;
};

export function ProtectedRoute({ redirectTo = "/login" }: Props) {
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
