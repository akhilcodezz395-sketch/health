
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<"patient" | "doctor">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log authentication status for debugging
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      console.log("Protected route:", location.pathname);
      console.log("Authentication status:", user ? "Authenticated" : "Not authenticated");
      console.log("User role:", userRole);
    }
  }, [location.pathname, user, userRole]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // No user, redirect to login with return URL
  if (!user) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // If user has a role but not allowed, redirect to their appropriate dashboard
    if (userRole === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (userRole === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
