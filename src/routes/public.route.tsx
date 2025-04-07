import { Navigate, Outlet } from "react-router";
import { useUserContext } from "@/contexts/user/use-user-context";

type Props = {
  redirectTo?: string;
};

export function PublicRoute({ redirectTo = "/" }: Props) {
  const { user } = useUserContext();

  return user ? <Navigate to={redirectTo} replace /> : <Outlet />;
}
