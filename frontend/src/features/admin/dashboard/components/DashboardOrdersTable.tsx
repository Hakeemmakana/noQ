import React from "react";
import DashboardSectionCard from "./DashboardSectionCard";
import { dashboardOrders } from "../data/dashboardData";

const statusStyles: Record<string, string> = {
  Completed: "bg-[#E7F8EC] text-[#2FAA61]",
  "In Progress": "bg-[#FFF1E7] text-[#E88939]",
  New: "bg-[#EEF0FF] text-[#4F5BFF]",
};

const DashboardOrdersTable: React.FC = () => {
  return (
    <DashboardSectionCard className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-5 sm:px-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
          Recent Orders
        </h3>
        <button className="text-sm font-bold text-[#1F27FF]">View All</button>
      </div>

      <div className="hidden md:block">
        <table className="w-full border-t border-[#ECECF3]">
          <thead className="bg-[#FAFAFD]">
            <tr className="text-left text-xs font-bold uppercase tracking-[0.08em] text-[#8A8EA6]">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Table</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {dashboardOrders.map((item) => (
              <tr key={item.id} className="border-t border-[#ECECF3]">
                <td className="px-6 py-5 text-sm font-bold text-[#31364A]">{item.id}</td>
                <td className="px-6 py-5 text-sm text-[#4C5168]">{item.customer}</td>
                <td className="px-6 py-5 text-sm text-[#4C5168]">{item.table}</td>
                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right text-sm font-bold text-[#1E2233]">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 p-4 md:hidden">
        {dashboardOrders.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#ECECF3] bg-[#FCFCFE] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#25293B]">{item.id}</p>
                <p className="mt-1 text-sm text-[#6E738C]">{item.customer}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-[#555B73]">
              <span>{item.table}</span>
              <span className="font-bold text-[#1E2233]">{item.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardSectionCard>
  );
};

export default DashboardOrdersTable;