import React from "react";
import type { DashboardChartPoint } from "../types/dashboard";
import DashboardSectionCard from "./DashboardSectionCard";

interface DashboardChartCardProps {
  chartData: DashboardChartPoint[];
  loading?: boolean;
}

const DashboardChartCard: React.FC<DashboardChartCardProps> = ({
  chartData,
  loading = false,
}) => {
  const months = chartData.map((d) => d.label);

  // Simple example: map revenue/profit to SVG coordinates.
  // Replace with proper scaling logic or a chart library in real app.
  const maxRevenue = Math.max(1, ...chartData.map((d) => d.revenue));
  const height = 265;
  const width = 700;
  const stepX = width / (chartData.length - 1 || 1);

  const revenuePoints = chartData.map((d, i) => {
    const x = i * stepX;
    const y = height - (d.revenue / maxRevenue) * height;
    return `${x},${y}`;
  });

  const revenuePath =
    chartData.length > 1
      ? `M${revenuePoints.join(" L")}`
      : `M0,${height} L0,${height}`;

  const areaPath =
    chartData.length > 1
      ? `${revenuePath} L${width},${height} L0,${height} Z`
      : `M0,${height} L0,${height} L${width},${height} Z`;

  return (
    <DashboardSectionCard className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
            Revenue vs Profit Trends
          </h3>
          <p className="mt-1 text-sm text-[#868BA3]">
            Comparison of performance over the selected period
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
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-[#6B7280]">
            Loading chart...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-[#6B7280]">
            No data available
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${width} ${height + 40}`}
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B45FF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#3B45FF" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Grid lines (optional, static for now) */}
            <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#F0F1F6" />
            <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#F0F1F6" />
            <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#F0F1F6" />

            {/* Area */}
            <path d={areaPath} fill="url(#revenueArea)" />

            {/* Revenue line */}
            <path
              d={revenuePath}
              fill="none"
              stroke="#2937FF"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Profit line (example, dashed) - you can compute similarly */}
            {/* For now, keeping your original static style as placeholder */}
          </svg>
        )}
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