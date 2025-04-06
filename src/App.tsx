import { BrowserRouter, Route, Routes } from "react-router";
import "./app.css";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { AuthProvider } from "./contexts/auth.context";
import { ProtectedRoute } from "./routes/protected.route";
import { HomePage } from "./pages/home.page";
import { PublicRoute } from "./routes/public.route";
import { BalanceProvider } from "./contexts/balance.context";
import { BetsPage } from "./pages/bets.page";

export function App() {
  return (
    <AuthProvider>
      <BalanceProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route Component={PublicRoute}>
              <Route path="/login" Component={LoginPage} />
              <Route path="/register" Component={RegisterPage} />
            </Route>
            {/* Protected Routes */}
            <Route Component={ProtectedRoute}>
              <Route path="/" Component={HomePage} />
              <Route path="/bets" Component={BetsPage} />
            </Route>
            {/* Not Found */}
            <Route path="*" Component={() => <h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </BalanceProvider>
    </AuthProvider>
  );
}
