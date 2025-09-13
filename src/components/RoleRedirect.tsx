
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RoleRedirectProps {
  defaultRoute?: string;
}

const RoleRedirect = ({ defaultRoute = "/" }: RoleRedirectProps) => {
  const { user, isLoading, userRole } = useAuth();

  useEffect(() => {
    if (user && userRole) {
      console.log("RoleRedirect - User role detected:", userRole);
    } else if (!user) {
      console.log("RoleRedirect - No authenticated user");
    }
  }, [user, userRole]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "patient") {
    return <Navigate to="/patient-dashboard" replace />;
  } else if (userRole === "doctor") {
    return <Navigate to="/doctor-dashboard" replace />;
  }

  // If we can't determine the role, go to the default route
  // But make sure the user is authenticated
  return <Navigate to={defaultRoute} replace />;
};

export default RoleRedirect;
