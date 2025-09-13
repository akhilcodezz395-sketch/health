
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MapPin, Calendar, Star, Search } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { WelcomeHeader } from "@/components/WelcomeHeader";
// import { fetchDoctors, Doctor } from "@/services/doctorService";
// import { useDebounce } from "@/hooks/use-debounce";
// import { useNavigate } from "react-router-dom";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "@/hooks/use-toast";

// const specializations = [
//   "all",
//   "General Medicine",
//   "Cardiology",
//   "Neurology",
//   "Pediatrics",
//   "Dermatology",
//   "Orthopedics",
//   "Gynecology",
//   "Ophthalmology",
//   "ENT",
//   "Psychiatry",
// ];

// const FindDoctors = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSpecialization, setSelectedSpecialization] = useState("all");
//   const navigate = useNavigate();
  
//   const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
//   useEffect(() => {
//     const loadDoctors = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchDoctors(debouncedSearchQuery, selectedSpecialization);
//         setDoctors(data);
//         console.log("Fetched doctors in component:", data);
//       } catch (error) {
//         console.error("Error loading doctors:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load doctors. Please try again.",
//           variant: "destructive"
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadDoctors();
//   }, [debouncedSearchQuery, selectedSpecialization]);
  
//   // Function to get initials for avatar fallback
//   const getInitials = (firstName: string | null, lastName: string | null) => {
//     if (!firstName && !lastName) return "Dr";
//     return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <WelcomeHeader 
//         title="Find Doctors" 
//         subtitle="Connect with the best healthcare professionals"
//         showActionButtons={false}
//       />
      
//       <main className="flex-1 container py-8">
//         <div className="mb-8">
//           <div className="grid gap-4 md:grid-cols-3">
//             <div className="md:col-span-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 <Input
//                   placeholder="Search doctors by name"
//                   className="pl-9"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <Select 
//                 value={selectedSpecialization}
//                 onValueChange={setSelectedSpecialization}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Specialization" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {specializations.map((spec) => (
//                     <SelectItem key={spec} value={spec}>
//                       {spec === "all" ? "All Specializations" : spec}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
        
//         {loading ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <Card key={i} className="overflow-hidden">
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center gap-4">
//                     <Skeleton className="h-12 w-12 rounded-full" />
//                     <div className="space-y-2">
//                       <Skeleton className="h-4 w-40" />
//                       <Skeleton className="h-3 w-24" />
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <Skeleton className="h-3 w-32" />
//                     <Skeleton className="h-3 w-20" />
//                   </div>
//                 </CardContent>
//                 <CardFooter className="bg-muted/50 flex justify-between">
//                   <Skeleton className="h-8 w-24" />
//                   <Skeleton className="h-8 w-32" />
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : doctors.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {doctors.map((doctor) => (
//               <Card key={doctor.id} className="overflow-hidden">
//                 <CardHeader className="pb-2">
//                   <div className="flex items-center gap-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={doctor.avatar_url || ""} />
//                       <AvatarFallback>{getInitials(doctor.first_name, doctor.last_name)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <CardTitle>
//                         Dr. {doctor.first_name} {doctor.last_name}
//                       </CardTitle>
//                       <CardDescription>{doctor.specialization || "General Medicine"}</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
//                     <MapPin className="h-4 w-4" />
//                     <span>Location varies</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-sm text-amber-500">
//                     <Star className="h-4 w-4 fill-amber-500" />
//                     <span>{(Math.random() * 1.5 + 3.5).toFixed(1)}</span>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="bg-muted/50 flex justify-between">
//                   <Button variant="ghost" size="sm">
//                     View Profile
//                   </Button>
//                   <Button size="sm" onClick={() => navigate("/patient-dashboard")}>
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Book Appointment
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <h3 className="text-lg font-medium mb-2">No doctors found</h3>
//             <p className="text-muted-foreground mb-6">
//               {searchQuery ? `No results for "${searchQuery}"` : 
//                selectedSpecialization !== "all" ? `No doctors with ${selectedSpecialization} specialization found` : 
//                "No doctors available at the moment"}
//             </p>
//             <Button onClick={() => { setSearchQuery(""); setSelectedSpecialization("all"); }}>
//               Clear Filters
//             </Button>
//           </div>
//         )}
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default FindDoctors;

// import React from 'react';
// import { mockDoctors } from '@/data/mockDoctors';
// import DoctorCard from '@/components/DoctorCard';

// const FindDoctors: React.FC = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Find Doctors</h2>
//       <div>
//         {mockDoctors.map((doctor) => (
//           <DoctorCard key={doctor.id} doctor={doctor} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FindDoctors;

import React, { useState } from 'react';
import { mockDoctors } from '@/data/mockDoctors';
import DoctorCard from '@/components/DoctorCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FindDoctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      specialization === '' || doctor.specialization === specialization;
    return matchesName && matchesSpecialization;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialization('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-blue-700">Find Doctors</h1>
          <p className="text-gray-600 mt-2 mb-6">
            Connect with the best healthcare professionals
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search doctors by name"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-full md:w-60 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value="">All Specializations</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="General">General Physician</option>
              {/* Add more as needed */}
            </select>
          </div>

          {/* Doctors List or Empty State */}
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">No doctors found</p>
              <p className="text-sm mt-1 mb-4">No doctors available at the moment</p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindDoctors;
