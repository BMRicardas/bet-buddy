import { AuthLayout } from "@/layouts/auth.layout";
import { MainLayout } from "@/layouts/main.layout";
import { BetsPage } from "@/pages/bets.page";
import { HomePage } from "@/pages/home.page";
import { LoginPage } from "@/pages/login.page";
import { NotFoundPage } from "@/pages/not-found.page";
import { RegisterPage } from "@/pages/register.page";
import { TransactionsPage } from "@/pages/transactions.page";
import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "./protected.route";
import { PublicRoute } from "./public.route";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route Component={PublicRoute}>
          <Route Component={AuthLayout}>
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
          </Route>
        </Route>
        {/* Protected Routes */}
        <Route Component={ProtectedRoute}>
          <Route Component={MainLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/bets" Component={BetsPage} />
            <Route path="/transactions" Component={TransactionsPage} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </BrowserRouter>
  );
}
