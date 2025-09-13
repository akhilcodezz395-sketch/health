
import { Link } from "react-router-dom";
import { Search, Activity, User, Pill, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickAccessCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Quick Access
        </CardTitle>
        <CardDescription>Useful tools and resources</CardDescription>
      </CardHeader>
      <CardContent className="py-6">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
            <Link to="/symptom-checker">
              <Activity className="h-5 w-5 mb-2" />
              <span>Symptom Checker</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
            <Link to="/find-doctors">
              <User className="h-5 w-5 mb-2" />
              <span>Find Doctors</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
            <Link to="/medicines">
              <Pill className="h-5 w-5 mb-2" />
              <span>Medicines</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center" asChild>
            <Link to="/emergency">
              <Bell className="h-5 w-5 mb-2" />
              <span>Emergency</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
