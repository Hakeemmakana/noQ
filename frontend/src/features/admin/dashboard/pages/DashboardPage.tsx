import React from "react";
// import AppLayout from "../components//AppLayout";
import { dashboardStats } from "../data/dashboardData";
import DashboardStatCard from "../components/DashboardStatCard";
import DashboardChartCard from "../components/DashboardChartCard";
import DashboardSubscriptionCard from "../components/DashboardSubscriptionCard";
import DashboardOrdersTable from "../components/DashboardOrdersTable";

const DashboardPage: React.FC = () => {
  return (
  
        <>
        
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
        {dashboardStats.map((item) => (
          <div key={item.id} className="xl:col-span-4">
            <DashboardStatCard item={item} />
          </div>
        ))}
      </section>

      <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <DashboardChartCard />
        </div>

        <div className="xl:col-span-4">
          <DashboardSubscriptionCard />
        </div>
      </section>

      <section className="mt-5">
        <DashboardOrdersTable />
      </section>
      </>
   
  );
};

export default DashboardPage;