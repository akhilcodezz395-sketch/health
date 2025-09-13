
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { fetchDoctors, Doctor } from "@/services/doctorService";
// import { toast } from "@/hooks/use-toast";
// import DoctorCard from "./DoctorCard";

// const AvailableDoctors = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDoctors = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchDoctors();
//         console.log("Raw doctor data:", data);
        
//         // Limit to 3 doctors to display on the dashboard
//         setDoctors(data.slice(0, 3));
//         console.log("Fetched doctors for dashboard:", data);
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
//   }, []);

//   if (loading) {
//     return (
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
//         <div className="grid md:grid-cols-3 gap-6 mb-8">
//           {[1, 2, 3].map((i) => (
//             <Card key={i} className="overflow-hidden">
//               <CardHeader className="pb-2">
//                 <div className="flex items-center gap-4">
//                   <Skeleton className="h-12 w-12 rounded-full" />
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-40" />
//                     <Skeleton className="h-3 w-24" />
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <Skeleton className="h-3 w-32" />
//                   <Skeleton className="h-3 w-20" />
//                 </div>
//               </CardContent>
//               <CardFooter className="bg-muted/50 flex justify-between">
//                 <Skeleton className="h-8 w-24" />
//                 <Skeleton className="h-8 w-32" />
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (doctors.length === 0) {
//     return (
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
//         <Card className="mb-8">
//           <CardContent className="text-center py-6">
//             <p className="mb-4">No doctors available at the moment</p>
//             <Link to="/find-doctors">
//               <Button>Browse All Doctors</Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
//       <div className="grid md:grid-cols-3 gap-6 mb-8">
//         {doctors.map((doctor) => (
//           <DoctorCard key={doctor.id} doctor={doctor} />
//         ))}
//       </div>
//       <div className="text-center mt-4">
//         <Link to="/find-doctors">
//           <Button>View All Doctors</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AvailableDoctors;


import React from "react";
import { mockDoctors } from "@/data/mockDoctors";
import DoctorCard from "@/components/DoctorCard";

const AvailableDoctors = () => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>
      <div className="grid gap-4">
        {mockDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default AvailableDoctors;
