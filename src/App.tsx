import { BrowserRouter, Route, Routes } from "react-router";
import "./app.css";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
    </BrowserRouter>
  );
}
