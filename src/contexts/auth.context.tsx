import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Login, LoginResponse } from "../types/api.types";
import { loginPlayer, logoutPlayer } from "../api";

type AuthContextType = {
  user?: LoginResponse;
  loading: boolean;
  login: (data: Login) => Promise<LoginResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadUser() {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");

        if (accessToken && user) {
          setUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(data: Login) {
    setLoading(true);

    try {
      const response = await loginPlayer(data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);

      return response;
    } catch (error) {
      console.error("Login failed:", error);

      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    logoutPlayer();
    setUser(undefined);
  }

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
