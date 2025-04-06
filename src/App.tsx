import { BrowserRouter, Route, Routes } from "react-router";
import "./app.css";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import { AuthProvider } from "./contexts/auth.context";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
