import PageMeta from "@/components/common/PageMeta";
import EcommerceMetrics from "@/components/dashboard/EcommerceMetrics";
import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import RecentOrders from "@/components/dashboard/RecentOrders";
import StatisticsChart from "@/components/dashboard/StatisticsChart";

const Dashboard = () => {
  return (
    <>
      <PageMeta
        title="Stock Mangement Dashboard"
        description="This is React Stock Management Dashboard."
      />
      <div className="grid grid-cols-12 gap-3 md:gap-4 p-3">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-6">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-6">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
