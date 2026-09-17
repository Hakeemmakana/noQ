// components/TopCategoriesTable.tsx
import React from "react";
import type { TopCategory } from "../types/dashboard";
import DashboardSectionCard from "./DashboardSectionCard";

interface TopCategoriesTableProps {
  categories: TopCategory[];
}

const TopCategoriesTable: React.FC<TopCategoriesTableProps> = ({
  categories,
}) => {
  return (
    <DashboardSectionCard className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-5 sm:px-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
          Top Selling Categories
        </h3>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-t border-[#ECECF3]">
          <thead className="bg-[#FAFAFD]">
            <tr className="text-left text-xs font-bold uppercase tracking-[0.08em] text-[#8A8EA6]">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Quantity</th>
              <th className="px-6 py-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.categoryId} className="border-t border-[#ECECF3]">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F3F4F8] ring-1 ring-[#E8E8F0]" />
                    <span className="text-sm font-bold text-[#31364A]">
                      {item.categoryName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right text-sm text-[#4C5168]">
                  {item.quantity}
                </td>
                <td className="px-6 py-5 text-right text-sm font-bold text-[#1E2233]">
                  ₹{item.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 p-4 md:hidden">
        {categories.map((item) => (
          <div
            key={item.categoryId}
            className="rounded-2xl border border-[#ECECF3] bg-[#FCFCFE] p-4"
          >
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-xl bg-[#F3F4F8] ring-1 ring-[#E8E8F0]" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#25293B]">
                  {item.categoryName}
                </p>
                <div className="mt-1 flex items-center justify-between text-sm text-[#555B73]">
                  <span>Qty: {item.quantity}</span>
                  <span className="font-bold text-[#1E2233]">
                    ₹{item.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardSectionCard>
  );
};

export default TopCategoriesTable;