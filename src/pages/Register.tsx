
import { useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Mail, User, Phone, Calendar, Lock, BadgeCheck } from "lucide-react";

const Register = () => {
  const { signUp, isLoading, user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("role") === "doctor" ? "doctor" : "patient";
  
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [passwordError, setPasswordError] = useState("");
  
  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPatientData({
      ...patientData,
      [name]: type === "checkbox" ? checked : value
    });
    
    if (name === "confirmPassword" || name === "password") {
      validatePasswords(
        name === "password" ? value : patientData.password,
        name === "confirmPassword" ? value : patientData.confirmPassword
      );
    }
  };
  
  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: type === "checkbox" ? checked : value
    });
    
    if (name === "confirmPassword" || name === "password") {
      validatePasswords(
        name === "password" ? value : doctorData.password,
        name === "confirmPassword" ? value : doctorData.confirmPassword
      );
    }
  };
  
  const handleSpecializationChange = (value: string) => {
    setDoctorData({
      ...doctorData,
      specialization: value
    });
  };
  
  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  
  const handleSubmitPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (patientData.password !== patientData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    await signUp(patientData.email, patientData.password, {
      firstName: patientData.firstName,
      lastName: patientData.lastName,
      role: "patient"
    });
  };
  
  const handleSubmitDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (doctorData.password !== doctorData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    await signUp(doctorData.email, doctorData.password, {
      firstName: doctorData.firstName,
      lastName: doctorData.lastName,
      role: "doctor",
      specialization: doctorData.specialization,
      licenseNumber: doctorData.licenseNumber
    });
  };
  
  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container max-w-2xl px-4">
          <div className="flex justify-center mb-6">
            <div className="bg-medical-blue p-3 rounded-full shadow-soft-md">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <Card className="border-0 shadow-soft-lg overflow-hidden transition-all duration-300 hover:shadow-soft-xl">
            <CardHeader className="space-y-1 bg-white pb-2">
              <CardTitle className="text-2xl text-center font-display font-semibold text-medical-blue-dark">Create an account</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Join Health Connect to access quality healthcare services
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue={initialTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100/80 p-1 rounded-md">
                <TabsTrigger value="patient" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-medical-blue-dark data-[state=active]:shadow-soft-sm transition-all">Register as Patient</TabsTrigger>
                <TabsTrigger value="doctor" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-medical-blue-dark data-[state=active]:shadow-soft-sm transition-all">Register as Doctor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="mt-0">
                <form onSubmit={handleSubmitPatient} className="animate-fade-in">
                  <CardContent className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sm font-medium">First Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="first-name" 
                            name="firstName" 
                            value={patientData.firstName} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sm font-medium">Last Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="last-name" 
                            name="lastName" 
                            value={patientData.lastName} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="email" 
                          type="email" 
                          name="email" 
                          placeholder="name@example.com" 
                          value={patientData.email} 
                          onChange={handlePatientChange} 
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="phone" 
                            type="tel" 
                            name="phone" 
                            placeholder="+91 9876543210" 
                            value={patientData.phone} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="dob" 
                            type="date" 
                            name="dob" 
                            value={patientData.dob} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="password" 
                            type="password" 
                            name="password" 
                            value={patientData.password} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            name="confirmPassword" 
                            value={patientData.confirmPassword} 
                            onChange={handlePatientChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                        {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                      <Checkbox 
                        id="terms" 
                        name="agreeTerms" 
                        checked={patientData.agreeTerms} 
                        onCheckedChange={(checked) => 
                          setPatientData({...patientData, agreeTerms: checked as boolean})
                        } 
                        required 
                        className="border-gray-300 text-medical-blue focus:ring-medical-blue-light"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms-of-service" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy-policy" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                    <Button 
                      className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-medium transition-all duration-200 h-11" 
                      type="submit" 
                      disabled={isLoading || !patientData.agreeTerms}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          Creating Account...
                        </span>
                      ) : "Create Account"}
                    </Button>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/login" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                        Sign in
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="doctor" className="mt-0">
                <form onSubmit={handleSubmitDoctor} className="animate-fade-in">
                  <CardContent className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-first-name" className="text-sm font-medium">First Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="doctor-first-name" 
                            name="firstName" 
                            value={doctorData.firstName} 
                            onChange={handleDoctorChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-last-name" className="text-sm font-medium">Last Name</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="doctor-last-name" 
                            name="lastName" 
                            value={doctorData.lastName} 
                            onChange={handleDoctorChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="doctor-email" 
                          type="email" 
                          name="email" 
                          placeholder="doctor@example.com" 
                          value={doctorData.email} 
                          onChange={handleDoctorChange} 
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-phone" className="text-sm font-medium">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="doctor-phone" 
                            type="tel" 
                            name="phone" 
                            placeholder="+91 9876543210" 
                            value={doctorData.phone} 
                            onChange={handleDoctorChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialization" className="text-sm font-medium">Specialization</Label>
                        <Select 
                          value={doctorData.specialization} 
                          onValueChange={handleSpecializationChange}
                          required
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200">
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="neurology">Neurology</SelectItem>
                            <SelectItem value="orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                            <SelectItem value="psychiatry">Psychiatry</SelectItem>
                            <SelectItem value="general-medicine">General Medicine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="license" className="text-sm font-medium">Medical License Number</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <BadgeCheck className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="license" 
                          name="licenseNumber" 
                          value={doctorData.licenseNumber} 
                          onChange={handleDoctorChange} 
                          required 
                          className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="doctor-password" 
                            type="password" 
                            name="password" 
                            value={doctorData.password} 
                            onChange={handleDoctorChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-confirm-password" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input 
                            id="doctor-confirm-password" 
                            type="password" 
                            name="confirmPassword" 
                            value={doctorData.confirmPassword} 
                            onChange={handleDoctorChange} 
                            required 
                            className="pl-10 bg-gray-50 border-gray-200 focus:border-medical-blue focus:ring-medical-blue-light transition-all duration-200"
                          />
                        </div>
                        {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-700">
                        Doctor accounts require verification before you can start accepting appointments.
                        We'll notify you once your account has been approved.
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                      <Checkbox 
                        id="doctor-terms" 
                        name="agreeTerms" 
                        checked={doctorData.agreeTerms} 
                        onCheckedChange={(checked) => 
                          setDoctorData({...doctorData, agreeTerms: checked as boolean})
                        } 
                        required 
                        className="border-gray-300 text-medical-blue focus:ring-medical-blue-light"
                      />
                      <label
                        htmlFor="doctor-terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms-of-service" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy-policy" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                    <Button 
                      className="w-full bg-medical-blue hover:bg-medical-blue-dark text-white font-medium transition-all duration-200 h-11" 
                      type="submit" 
                      disabled={isLoading || !doctorData.agreeTerms}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          Creating Account...
                        </span>
                      ) : "Create Doctor Account"}
                    </Button>
                    <div className="text-center text-sm">
                      Already registered?{" "}
                      <Link to="/login?role=doctor" className="font-medium text-medical-blue hover:text-medical-blue-dark transition-colors">
                        Sign in
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

export default Register;
