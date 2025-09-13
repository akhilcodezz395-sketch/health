
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, profile, userRole, signOut } = useAuth();
  const location = useLocation();

  const getInitials = () => {
    if (!profile) return "HC";
    
    const first = profile.first_name?.charAt(0) || "";
    const last = profile.last_name?.charAt(0) || "";
    return (first + last) || "HC";
  };

  const getDashboardLink = () => {
    if (userRole === "patient") {
      return "/patient-dashboard";
    } else if (userRole === "doctor") {
      return "/doctor-dashboard";
    }
    return "/dashboard";
  };

  // Check if the current page is a dashboard page
  const isDashboard = location.pathname.includes("dashboard");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="px-2">
                <Link to="/" className="flex items-center gap-2 py-4">
                  <span className="text-xl font-bold text-primary">Health Connect</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {/* Dynamic menu items based on user role */}
                  {user && (
                    <Link 
                      to={getDashboardLink()} 
                      className="py-2 text-foreground hover:text-primary font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link to="/symptom-checker" className="py-2 text-foreground hover:text-primary">
                    Symptom Checker
                  </Link>
                  <Link to="/find-doctors" className="py-2 text-foreground hover:text-primary">
                    Find Doctors
                  </Link>
                  <Link to="/medicines" className="py-2 text-foreground hover:text-primary">
                    Medicines
                  </Link>
                  <Link to="/emergency" className="py-2 text-medical-red hover:text-medical-red-dark font-medium">
                    Emergency
                  </Link>
                  {user ? (
                    <>
                      <Link to="/profile" className="py-2 text-foreground hover:text-primary">
                        Profile
                      </Link>
                      <button 
                        onClick={() => signOut()} 
                        className="py-2 text-foreground hover:text-primary text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="py-2 text-foreground hover:text-primary">
                        Login
                      </Link>
                      <Link to="/register" className="py-2 text-foreground hover:text-primary">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <span className="hidden md:inline-block text-xl font-bold text-primary">Health Connect</span>
            <span className="md:hidden text-xl font-bold text-primary">HC</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          {/* Show Dashboard link if logged in */}
          {user && (
            <Link 
              to={getDashboardLink()}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isDashboard ? "text-primary" : ""
              }`}
            >
              Dashboard
            </Link>
          )}
          <Link to="/symptom-checker" className="text-sm font-medium hover:text-primary transition-colors">
            Symptom Checker
          </Link>
          <Link to="/find-doctors" className="text-sm font-medium hover:text-primary transition-colors">
            Find Doctors
          </Link>
          <Link to="/medicines" className="text-sm font-medium hover:text-primary transition-colors">
            Medicines
          </Link>
          <Link to="/emergency" className="text-sm font-medium text-medical-red hover:text-medical-red-dark transition-colors">
            Emergency
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {userRole === "doctor" ? "Doctor Account" : "My Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={getDashboardLink()}>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hidden md:flex">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="hidden md:flex">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
