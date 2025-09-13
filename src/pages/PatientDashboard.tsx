
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AvailableDoctors from "@/components/dashboard/AvailableDoctors";
import DashboardBottom from "@/components/dashboard/DashboardBottom";

const PatientDashboard = () => {
  useEffect(() => {
    document.title = "Patient Dashboard | Health Connect";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container">
          <DashboardHeader />
          <DashboardOverview />
          <AvailableDoctors />
          <DashboardBottom />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
