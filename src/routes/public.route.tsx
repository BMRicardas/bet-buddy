import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/auth.context";

type Props = {
  redirectTo?: string;
};

export function PublicRoute({ redirectTo = "/" }: Props) {
  const { user } = useAuth();

  return user ? <Navigate to={redirectTo} replace /> : <Outlet />;
}
