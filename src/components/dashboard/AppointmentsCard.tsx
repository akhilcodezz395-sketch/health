
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AppointmentsCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
      <CardHeader className="pb-2 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-purple-100/50">
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <Calendar className="h-5 w-5 text-medical-purple" />
          </div>
          Upcoming Appointments
        </CardTitle>
        <CardDescription>Your scheduled visits</CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex gap-4 items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-slate-800">Dr. Sarah Johnson</p>
              <p className="text-sm text-slate-500">Tomorrow, 10:00 AM</p>
            </div>
          </div>
          <div className="flex gap-4 items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-slate-800">Dr. Michael Chen</p>
              <p className="text-sm text-slate-500">Aug 15, 2:30 PM</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-6 w-full rounded-full hover:bg-primary/5 transition-all duration-300">Manage Appointments</Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentsCard;
