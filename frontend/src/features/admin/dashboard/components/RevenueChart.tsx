// components/RevenueChart.tsx (simplified, key parts)

import { Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { RevenueTrendPoint } from "../types/dashboard";
import DashboardSectionCard from "./DashboardSectionCard";
import { AreaChart } from "lucide-react";

interface RevenueChartProps {
  data: RevenueTrendPoint[];
  loading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <DashboardSectionCard className="p-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
          Revenue Trend
        </h3>
        <div className="mt-6 h-64 sm:h-72 flex items-center justify-center text-sm text-[#6B7280]">
          Loading chart...
        </div>
      </DashboardSectionCard>
    );
  }

  if (!data || data.length === 0) {
    return (
      <DashboardSectionCard className="p-6">
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
          Revenue Trend
        </h3>
        <div className="mt-6 h-64 sm:h-72 flex items-center justify-center text-sm text-[#6B7280]">
          No trend data available for this range.
        </div>
      </DashboardSectionCard>
    );
  }

  return (
    <DashboardSectionCard className="p-6">
      <h3 className="text-xl font-bold tracking-[-0.03em] text-[#171A28] sm:text-2xl">
        Revenue Trend
      </h3>

      <div className="mt-6 h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F27FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#1F27FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ECECF3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EF",
                fontSize: 12,
              }}
              formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1F27FF"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardSectionCard>
  );
};

export default RevenueChart;