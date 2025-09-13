
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHeader = () => {
  const { profile } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white p-6 rounded-xl shadow-soft-sm border border-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-medical-blue-dark">
          Welcome, {profile?.first_name || "Patient"}
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your health information and appointments
        </p>
      </div>
      <Button asChild className="mt-4 md:mt-0 rounded-full px-6 py-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
        <Link to="/appointments/new">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Book Appointment</span>
        </Link>
      </Button>
    </div>
  );
};

export default DashboardHeader;
