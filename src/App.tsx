import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/user/user.provider";
import { AppRouter } from "./routes/app.router";

import "./app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </QueryClientProvider>
  );
}
