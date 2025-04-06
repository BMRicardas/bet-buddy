import { BrowserRouter, Route, Routes } from "react-router";
import "./app.css";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { AuthProvider } from "./contexts/auth.context";
import { ProtectedRoute } from "./routes/protected.route";
import { HomePage } from "./pages/home.page";
import { PublicRoute } from "./routes/public.route";

export function App() {
  return (
    <AuthProvider>
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
            <Route path="/dashboard" Component={() => <h1>Dashboard</h1>} />
          </Route>
          {/* Not Found */}
          <Route path="*" Component={() => <h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
