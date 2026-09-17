// pages/DashboardPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchDashboardData,
  exportRevenueReportCsv,
  exportRevenueReportPdf,
} from "../service/dashboardService";
import type {
  DashboardFilters,
  DashboardResponse,
  DashboardStat,
  RevenueTrendPoint,
} from "../types/dashboard";
import DashboardStatCard from "../components/DashboardStatCard";
import TopProductsTable from "../components/TopProductTable";
import TopCategoriesTable from "../components/TopCategoriesTable";
import DashboardSubscriptionCard from "../components/DashboardSubscriptionCard";
import RevenueChart from "../components/RevenueChart";

const rangeOptions: { label: string; value: DashboardFilters["type"] }[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Custom", value: "custom" },
];

const DashboardPage: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({ type: "today" });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedFilters: DashboardFilters = useMemo(() => {
    if (filters.type !== "custom") {
      return { type: filters.type };
    }
    return { type: "custom", startDate, endDate };
  }, [filters.type, startDate, endDate]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchDashboardData(resolvedFilters);
        if (!cancelled) setData(result);
      } catch {
        if (!cancelled) setError("Failed to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [resolvedFilters]);

  const handleRangeTypeChange = (type: DashboardFilters["type"]) => {
    setFilters((prev) => ({ ...prev, type }));
    if (type !== "custom") {
      setStartDate("");
      setEndDate("");
    }
  };

  const stats: DashboardStat[] = useMemo(() => {
    if (!data) return [];
    return [
      {
        id: "total_orders",
        title: "Total Orders",
        value: data.totalOrder.toLocaleString(),
        badgeVariant: "blue",
      },
      {
        id: "completed_orders",
        title: "Completed Orders",
        value: data.completedOrder.toLocaleString(),
        badgeVariant: "green",
      },
      {
        id: "total_revenue",
        title: "Total Revenue",
        value: `₹${data.totalRevenue.toLocaleString()}`,
        badgeVariant: "orange",
      },
    ];
  }, [data]);

  const chartData: RevenueTrendPoint[] = useMemo(() => {
    return data?.revenueTrend ?? [];
  }, [data]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-[-0.02em] text-[#151826]">
        Dashboard
      </h1>

      {/* Filters + Export */}
      <section className="flex flex-col gap-3 rounded-2xl border border-[#ECECF3] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Range dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm font-medium text-[#4B5068]">Range:</label>
          <select
            value={filters.type}
            onChange={(e) =>
              handleRangeTypeChange(e.target.value as DashboardFilters["type"])
            }
            className="rounded-xl border border-[#E2E4EF] bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#1F27FF] focus:outline-none"
          >
            {[
              { label: "Today", value: "today" },
              { label: "Yesterday", value: "yesterday" },
              { label: "This Week", value: "this_week" },
              { label: "This Month", value: "this_month" },
              { label: "Custom", value: "custom" },
            ].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {filters.type === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border border-[#E2E4EF] px-3 py-2 text-sm text-[#1F2937] focus:border-[#1F27FF] focus:outline-none"
              />
              <span className="text-sm text-[#6B7280]">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border border-[#E2E4EF] px-3 py-2 text-sm text-[#1F2937] focus:border-[#1F27FF] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Export buttons (unchanged) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportRevenueReportCsv(resolvedFilters)}
            className="rounded-xl bg-[#F5F6FA] px-4 py-2 text-sm font-semibold text-[#1F27FF] transition hover:bg-[#EBECF5]"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportRevenueReportPdf(resolvedFilters)}
            className="rounded-xl bg-[#1F27FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1820EA]"
          >
            Export PDF
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading && !data ? (
          <div className="text-sm text-[#6B7280]">Loading stats...</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          stats.map((item) => (
            <div key={item.id}>
              <DashboardStatCard item={item} />
            </div>
          ))
        )}
      </section>

      {/* Chart + Subscription */}
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <DashboardSubscriptionCard />
        </div>
      </section>

      {/* Top Products */}
      <section>
        {loading && !data ? (
          <div className="text-sm text-[#6B7280]">Loading top products...</div>
        ) : (
          <TopProductsTable products={data?.topProducts ?? []} />
        )}
      </section>

      {/* Top Categories */}
      {data?.topCategories && data.topCategories.length > 0 ? (
        <section>
          <TopCategoriesTable categories={data.topCategories} />
        </section>
      ) : null}
    </div>
  );
};

export default DashboardPage;