
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface WelcomeHeaderProps {
  title?: string;
  subtitle?: string;
  showActionButtons?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export const WelcomeHeader = ({
  title,
  subtitle,
  showActionButtons = true,
  searchQuery = "",
  onSearchChange,
  showSearch = false,
  searchPlaceholder = "Search..."
}: WelcomeHeaderProps) => {
  const { user, profile } = useAuth();
  
  const userName = profile?.first_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 py-12">
      <div className="container relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -mt-20 -mr-20 filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-100/30 rounded-full -mb-16 -ml-16 filter blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-primary to-medical-blue">
              {title || `Welcome back, ${userName}`}
            </h1>
            <p className="text-lg text-slate-600">
              {subtitle || "How are you feeling today?"}
            </p>
          </div>
          
          {showActionButtons && (
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/profile/records">
                <Button variant="outline" className="bg-white rounded-full px-6 py-2 border-2 border-primary/10 text-slate-700 hover:bg-primary/5 hover:border-primary/20 transition-all">
                  View Health Records
                </Button>
              </Link>
              <Link to="/find-doctors">
                <Button className="rounded-full px-6 py-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                  Book Appointment
                </Button>
              </Link>
            </div>
          )}
        </div>

        {showSearch && (
          <div className="mt-8 relative z-10">
            <div className="relative w-full md:max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full py-4 pl-12 pr-4 bg-white border-none rounded-full shadow-soft-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:shadow-soft-lg transition-all duration-300"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
