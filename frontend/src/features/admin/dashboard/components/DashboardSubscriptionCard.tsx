import React from "react";
import DashboardSectionCard from "./DashboardSectionCard";

const DashboardSubscriptionCard: React.FC = () => {
  return (
    <DashboardSectionCard className="flex h-full flex-col p-5 sm:p-6">
      <div className="w-fit rounded-full bg-[#1F27FF] px-3 py-1 text-xs font-bold text-white">
        PRO PLAN
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
        Subscription
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#858AA2]">
        Manage your hotel operations smoothly with our premium features.
      </p>

      <div className="mt-6 rounded-[24px] border border-[#E8E8F0] bg-[#F7F7FB] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8A8EA6]">
          End Date
        </p>
        <h4 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#171A28]">
          Oct 24, 2024
        </h4>

        <div className="mt-5 h-2 rounded-full bg-[#E5E7F0]">
          <div className="h-2 w-[62%] rounded-full bg-[#1F27FF]" />
        </div>

        <p className="mt-3 text-xs text-[#8B90A7]">124 days remaining</p>
      </div>

      <button className="mt-6 rounded-2xl bg-[#1F27FF] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#1820EA]">
        See Subscription Details
      </button>

      <button className="mt-4 text-sm font-medium text-[#A0A5BA]">
        Change billing method
      </button>
    </DashboardSectionCard>
  );
};

export default DashboardSubscriptionCard;