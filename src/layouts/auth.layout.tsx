import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <main className="flex flex-col justify-between min-h-screen max-w-screen-lg mx-auto">
      <Outlet />
    </main>
  );
}
