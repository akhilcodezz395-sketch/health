
import HealthOverviewCard from "./HealthOverviewCard";
import MedicationsCard from "./MedicationsCard";
import AppointmentsCard from "./AppointmentsCard";

const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <HealthOverviewCard />
      <MedicationsCard />
      <AppointmentsCard />
    </div>
  );
};

export default DashboardOverview;
