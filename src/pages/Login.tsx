
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Lock, Mail, User } from "lucide-react";

const Login = () => {
  const { signIn, isLoading, user, userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // Get the return URL from location state
  const returnUrl = location.state?.returnUrl || "/dashboard";
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  // Check for role and redirect accordingly after successful login
  useEffect(() => {
    if (user && userRole) {
      if (returnUrl === "/dashboard") {
        if (userRole === "patient") {
          navigate("/patient-dashboard");
        } else if (userRole === "doctor") {
          navigate("/doctor-dashboard");
        }
      } else {
        navigate(returnUrl);
      }
    }
  }, [user, userRole, navigate, returnUrl]);

  // Redirect if user is already logged in
  if (user) {
    if (returnUrl === "/dashboard") {
      if (userRole === "patient") {
        return <Navigate to="/patient-dashboard" />;
      } else if (userRole === "doctor") {
        return <Navigate to="/doctor-dashboard" />;
      }
    } else {
      return <Navigate to={returnUrl} />;
    }
    // If role is not yet determined but user is logged in, wait for role determination
    return <div className="flex items-center justify-center h-screen">Loading user profile...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="container max-w-md px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-medical-blue p-3 rounded-full shadow-soft-md">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <Card className="border-0 shadow-soft-lg overflow-hidden transition-all duration-300 hover:shadow-soft-xl">
            <CardHeader className="space-y-1 bg-white pb-2">
              <CardTitle className="text-2xl text-center font-display font-semibold text-medical-blue-dark">Welcome Back</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100/80 p-1 rounded-md">
                <TabsTrigger value="patient" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-medical-blue-dark data-[state=active]:shadow-soft-sm transition-all">Patient</TabsTrigger>
                <TabsTrigger value="doctor" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-medical-blue-dark data-[state=active]:shadow-soft-sm transition-all">Doctor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, "patient")} className="animate-fade-in">
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="name@example.com" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <Link to="/forgot-password" className="text-xs font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="password" 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleChange}
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                    <Button 
                      className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-medium transition-all duration-200 h-11"
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          Signing in...
                        </span>
                      ) : "Sign In"}
                    </Button>
                    <div className="text-center text-sm">
                      Don't have an account?{" "}
                      <Link to="/register" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                        Sign up
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="doctor" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, "doctor")} className="animate-fade-in">
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <Label htmlFor="doctor-email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="doctor-email" 
                          name="email"
                          type="email" 
                          placeholder="doctor@example.com" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctor-password" className="text-sm font-medium">Password</Label>
                        <Link to="/forgot-password" className="text-xs font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="doctor-password" 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleChange}
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-700">
                        Doctor accounts require verification before full access is granted.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                    <Button 
                      className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-medium transition-all duration-200 h-11"
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          Signing in...
                        </span>
                      ) : "Sign In"}
                    </Button>
                    <div className="text-center text-sm">
                      New doctor?{" "}
                      <Link to="/register?role=doctor" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                        Register here
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
