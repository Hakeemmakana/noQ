import React from "react";
import DashboardSectionCard from "./DashboardSectionCard";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const DashboardChartCard: React.FC = () => {
  return (
    <DashboardSectionCard className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
            Revenue vs Profit Trends
          </h3>
          <p className="mt-1 text-sm text-[#868BA3]">
            Comparison of performance over the last 7 months
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#666B81] sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2937FF]" />
            Revenue
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4D7E5]" />
            Profit
          </div>
        </div>
      </div>

      <div className="mt-8 h-[240px] sm:h-[300px] lg:h-[340px]">
        <svg
          viewBox="0 0 700 320"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B45FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3B45FF" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <line x1="0" y1="85" x2="700" y2="85" stroke="#F0F1F6" />
          <line x1="0" y1="145" x2="700" y2="145" stroke="#F0F1F6" />
          <line x1="0" y1="205" x2="700" y2="205" stroke="#F0F1F6" />
          <line x1="0" y1="265" x2="700" y2="265" stroke="#F0F1F6" />

          <path
            d="M0,225 C60,210 100,200 160,208 C220,216 260,208 320,170 C380,128 430,118 490,146 C550,174 610,170 700,112 L700,320 L0,320 Z"
            fill="url(#revenueArea)"
          />

          <path
            d="M0,245 C70,230 120,227 170,236 C235,248 270,235 330,206 C390,178 432,170 500,188 C560,202 620,198 700,172"
            fill="none"
            stroke="#C9CDDB"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          <path
            d="M0,225 C60,210 100,200 160,208 C220,216 260,208 320,170 C380,128 430,118 490,146 C550,174 610,170 700,112"
            fill="none"
            stroke="#2937FF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-xs font-semibold text-[#7E8298]">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </DashboardSectionCard>
  );
};

export default DashboardChartCard;