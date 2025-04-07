import { Link, Outlet, useNavigate } from "react-router";
import { formatCurrency } from "../utils/currency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutPlayer } from "../api/queries";
import { useUserContext } from "../contexts/user/use-user-context";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MainLayout() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate } = useMutation({
    mutationFn: logoutPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login", { replace: true });
    },
  });

  function handleLogout() {
    mutate();
    setMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(() => !mobileMenuOpen);
  }

  return (
    <div className="flex flex-col justify-between min-h-screen max-w-screen-lg mx-auto">
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center p-6">
        <Link to="/" className="text-xl font-bold">
          BetBuddy
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/bets">My Bets</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/transactions">My Transactions</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-col items-end">
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm">
            Balance {formatCurrency(user?.balance || 0)}
          </div>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          BetBuddy
        </Link>
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm">
            Balance {formatCurrency(user?.balance || 0)}
          </div>
        </div>
        <Popover onOpenChange={toggleMobileMenu} open={mobileMenuOpen}>
          <PopoverTrigger asChild>
            <Button size="icon">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col items-start gap-4 p-4">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col items-start">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/bets">My Bets</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/transactions">My Transactions</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </PopoverContent>
        </Popover>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground border-t">
        <p>
          &copy; {new Date().getFullYear()} BetBuddy - Online Betting Platform.
        </p>
      </footer>
    </div>
  );
}
