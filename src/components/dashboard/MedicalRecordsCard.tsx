
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MedicalRecordsCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
      <CardHeader className="pb-2 border-b border-slate-100 bg-gradient-to-r from-green-50 to-green-100/50">
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <FileText className="h-5 w-5 text-medical-green" />
          </div>
          Recent Medical Records
        </CardTitle>
        <CardDescription>Your latest test results and reports</CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <p className="font-medium text-slate-800">Blood Test Results</p>
              <p className="text-sm text-slate-500">Uploaded on July 24, 2025</p>
            </div>
            <Button size="sm" className="rounded-full bg-white text-primary border border-primary/20 hover:bg-primary/5">View</Button>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <p className="font-medium text-slate-800">X-Ray Report</p>
              <p className="text-sm text-slate-500">Uploaded on July 10, 2025</p>
            </div>
            <Button size="sm" className="rounded-full bg-white text-primary border border-primary/20 hover:bg-primary/5">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsCard;
