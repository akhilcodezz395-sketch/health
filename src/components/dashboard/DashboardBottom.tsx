
import MedicalRecordsCard from "./MedicalRecordsCard";
import QuickAccessCard from "./QuickAccessCard";

const DashboardBottom = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MedicalRecordsCard />
      <QuickAccessCard />
    </div>
  );
};

export default DashboardBottom;
