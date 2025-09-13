
import { Link } from "react-router-dom";
import { Pill, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MedicationsCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
      <CardHeader className="pb-2 border-b border-slate-100 bg-gradient-to-r from-yellow-50 to-yellow-100/50">
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <Pill className="h-5 w-5 text-medical-yellow-dark" />
          </div>
          Medications
        </CardTitle>
        <CardDescription>Your active prescriptions</CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <p className="font-medium text-slate-800">Amoxicillin</p>
              <p className="text-sm text-slate-500">500mg, 3 times daily</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-yellow-50">
              <Bell className="h-4 w-4 text-medical-yellow-dark" />
            </Button>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <p className="font-medium text-slate-800">Ibuprofen</p>
              <p className="text-sm text-slate-500">400mg, as needed</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-yellow-50">
              <Bell className="h-4 w-4 text-medical-yellow-dark" />
            </Button>
          </div>
        </div>
        <Button variant="outline" className="mt-6 w-full rounded-full hover:bg-primary/5 transition-all duration-300" asChild>
          <Link to="/medicines">View All Medications</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MedicationsCard;
