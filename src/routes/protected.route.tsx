import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth.context";

type Props = {
  redirectTo?: string;
};

export function ProtectedRoute({ redirectTo = "/login" }: Props) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
