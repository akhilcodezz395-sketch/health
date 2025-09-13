
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Activity, 
  BellRing, 
  Clock,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const DoctorDashboard = () => {
  const { profile } = useAuth();

  useEffect(() => {
    document.title = "Doctor Dashboard | Health Connect";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome, Dr. {profile?.last_name || "Doctor"}
              </h1>
              <p className="text-muted-foreground">
                Manage your appointments and patient information
              </p>
            </div>
            <Button asChild className="flex items-center gap-2">
              <Link to="/appointments/view">
                <Calendar className="h-4 w-4" />
                <span>View Schedule</span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Today's Patients
                </CardTitle>
                <CardDescription>Your appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">John Peterson</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>10:00 AM - Follow-up</span>
                      </div>
                    </div>
                    <Badge>Next</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Sarah Miller</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>11:30 AM - Consultation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Robert Jones</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>2:00 PM - New Patient</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-6 w-full">View All Appointments</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />
                  Patient Records
                </CardTitle>
                <CardDescription>Recently accessed patients</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>ET</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emma Thompson</p>
                        <p className="text-sm text-muted-foreground">Last visit: July 25, 2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>DW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">David Wilson</p>
                        <p className="text-sm text-muted-foreground">Last visit: July 22, 2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="mt-6 w-full">View All Patients</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Messages
                </CardTitle>
                <CardDescription>Recent patient inquiries</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BellRing className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Medication Question</p>
                      <p className="text-sm text-muted-foreground">from Lisa Brown - 1h ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <BellRing className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Test Results</p>
                      <p className="text-sm text-muted-foreground">from Mark Davis - 3h ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-6 w-full">View All Messages</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Patient Analytics
                </CardTitle>
                <CardDescription>Weekly patient statistics</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Appointments</p>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">New Patients</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">Follow-ups</p>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold">92%</p>
                      <p className="text-sm text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Conferences and meetings</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="min-w-fit text-center">
                      <p className="text-xl font-bold">15</p>
                      <p className="text-xs text-muted-foreground">AUG</p>
                    </div>
                    <div>
                      <p className="font-medium">Medical Conference</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="min-w-fit text-center">
                      <p className="text-xl font-bold">22</p>
                      <p className="text-xs text-muted-foreground">AUG</p>
                    </div>
                    <div>
                      <p className="font-medium">Staff Meeting</p>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:30 PM</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="mt-6 w-full">View Calendar</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
