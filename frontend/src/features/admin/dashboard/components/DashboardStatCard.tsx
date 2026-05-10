import React from "react";
import type { DashboardStat } from "../types/dashboard";
import DashboardSectionCard from "./DashboardSectionCard";

interface DashboardStatCardProps {
  item: DashboardStat;
}

const badgeClasses: Record<DashboardStat["badgeVariant"], string> = {
  green: "bg-[#E7F8EC] text-[#2FAA61]",
  blue: "bg-[#EEF0FF] text-[#4F5BFF]",
  orange: "bg-[#FFF1E7] text-[#EB8A37]",
};

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <DashboardSectionCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}>
          <Icon size={20} className={item.iconColor} />
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClasses[item.badgeVariant]}`}>
          {item.badge}
        </span>
      </div>

      <div className="mt-7">
        <p className="text-sm font-medium text-[#8A8EA6]">{item.title}</p>
        <h3 className="mt-2 text-[28px] font-extrabold tracking-[-0.03em] text-[#151826]">
          {item.value}
        </h3>
      </div>
    </DashboardSectionCard>
  );
};

export default DashboardStatCard;