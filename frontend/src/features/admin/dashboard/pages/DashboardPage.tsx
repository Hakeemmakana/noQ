import React, { useEffect, useMemo, useState } from "react";
import {
  fetchDashboardData,
  exportRevenueReportCsv,
  exportRevenueReportPdf,
} from "../service/dashboardService";
import type { DashboardFilters, DashboardResponse, DashboardStat } from "../types/dashboard";
import DashboardStatCard from "../components/DashboardStatCard";
import TopProductsTable from "../components/TopProductTable";

const rangeOptions: { label: string; value: DashboardFilters["type"] }[] = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "this_week" },
  { label: "Custom", value: "custom" },
];

const DashboardPage: React.FC = () => {

  const [filters, setFilters] = useState<DashboardFilters>({
    type: "today",
  });

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedFilters: DashboardFilters = useMemo(() => {
    if (filters.type !== "custom") {
      return { type: filters.type };
    }
    return {
      type: "custom",
      startDate,
      endDate,
    };
  }, [filters.type, startDate, endDate]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchDashboardData(resolvedFilters);
        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load dashboard data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
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

  const handleExportCsv = () => {
    exportRevenueReportCsv(resolvedFilters);
  };

  const handleExportPdf = () => {
    exportRevenueReportPdf(resolvedFilters);
  };

  // Build stats for cards
  const stats: DashboardStat[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        id: "total_orders",
        title: "Total Orders",
        value: data.totalOrder,
        badge: undefined,
        badgeVariant: "blue",
      },
      {
        id: "completed_orders",
        title: "Completed Orders",
        value: data.completedOrder,
        badge: undefined,
        badgeVariant: "green",
      },
      {
        id: "total_revenue",
        title: "Total Revenue",
        value: `₹${data.totalRevenue.toLocaleString()}`,
        badge: undefined,
        badgeVariant: "orange",
      },
    ];
  }, [data]);

  return (
    <div className="space-y-5">
      {/* Filters + Export */}
      <section className="flex flex-col gap-3 rounded-2xl border border-[#ECECF3] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {rangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleRangeTypeChange(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filters.type === opt.value
                  ? "bg-[#1F27FF] text-white"
                  : "bg-[#F5F6FA] text-[#4B5068] hover:bg-[#EBECF5]"
              }`}
            >
              {opt.label}
            </button>
          ))}

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

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="rounded-xl bg-[#F5F6FA] px-4 py-2 text-sm font-semibold text-[#1F27FF] transition hover:bg-[#EBECF5]"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportPdf}
            className="rounded-xl bg-[#1F27FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1820EA]"
          >
            Export PDF
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12">
        {loading && !data ? (
          <div className="xl:col-span-12 text-sm text-[#6B7280]">Loading stats...</div>
        ) : error ? (
          <div className="xl:col-span-12 text-sm text-red-600">{error}</div>
        ) : (
          stats.map((item) => (
            <div key={item.id} className="xl:col-span-4">
              <DashboardStatCard item={item} />
            </div>
          ))
        )}
      </section>

      {/* Top Products */}
      <section className="mt-5">
        {loading && !data ? (
          <div className="text-sm text-[#6B7280]">Loading top products...</div>
        ) : (
          <TopProductsTable
            products={data?.topProducts ?? []}
            // onViewAll={() => navigate("/dashboard/orders")}
          />
        )}
      </section>
    </div>
  );
};

export default DashboardPage;