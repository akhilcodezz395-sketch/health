
import { Calendar, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/services/doctorService";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Function to get initials for avatar fallback
  const getInitials = (firstName: string | null, lastName: string | null) => {
    if (!firstName && !lastName) return "Dr";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
  };

  return (
    <Card className="overflow-hidden border-none shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
      <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-blue-100/30">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
            <AvatarImage src={doctor.avatar_url || ""} />
            <AvatarFallback className="bg-primary text-white font-bold">{getInitials(doctor.first_name, doctor.last_name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-slate-800">
              Dr. {doctor.first_name} {doctor.last_name}
            </CardTitle>
            <CardDescription className="text-primary font-medium">{doctor.specialization || "General Medicine"}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span>Location varies</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-amber-600 font-medium ml-1">{(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 flex justify-between py-3">
        <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-slate-200">
          View Profile
        </Button>
        <Button size="sm" className="bg-primary text-white rounded-full shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30">
          <Calendar className="h-4 w-4 mr-1" />
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
