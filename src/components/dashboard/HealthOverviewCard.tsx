
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HealthOverviewCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
      <CardHeader className="pb-2 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-blue-100/50">
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          Health Overview
        </CardTitle>
        <CardDescription>Your recent health metrics</CardDescription>
      </CardHeader>
      <CardContent className="text-center py-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-sm mb-1">Blood Pressure</p>
            <p className="text-xl font-semibold text-slate-800">120/80</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-sm mb-1">Heart Rate</p>
            <p className="text-xl font-semibold text-slate-800">72 bpm</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <p className="text-slate-500 text-sm mb-1">Weight</p>
            <p className="text-xl font-semibold text-slate-800">68 kg</p>
          </div>
        </div>
        <Button variant="outline" className="mt-6 w-full rounded-full hover:bg-primary/5 transition-all duration-300">View Details</Button>
      </CardContent>
    </Card>
  );
};

export default HealthOverviewCard;
