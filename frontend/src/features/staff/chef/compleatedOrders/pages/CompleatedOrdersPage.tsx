import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type {  CompletedOrderFilters, IOrderType } from "../types/orderTypes";
import CompletedOrderCard from "../components/OrderCard";
import Pagination from "../../../../common/CommonPagination";
import { errorToast } from "../../../../../shared/utils/toastNotification";

const defaultFilters: CompletedOrderFilters = {
  waiterFilter: "my-orders",
  dateFilter: "today",
  sort: "latest",
};

export default function CompletedOrdersPageWaiter() {
  const [orders, setOrders] = useState<IOrderType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<CompletedOrderFilters>(defaultFilters);

  // Custom date fields (only used when dateFilter === "custom")
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);

      const payload: CompletedOrderFilters & { page: number; limit: number } = {
        ...filters,
        page,
        limit,
      };

      if (filters.dateFilter === "custom") {
        (payload as any).customFrom = customFrom || undefined;
        (payload as any).customTo = customTo || undefined;
      }

      const res = await orderService.getCompletedOrders(payload as any);
      setOrders(res.data);
      setTotal(res.total);
      setLimit(res.limit)
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Fetch when page/limit/filters change
  useEffect(() => {
    fetchCompletedOrders();
  }, [page, limit, filters, customFrom, customTo]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
        Completed Orders
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Who */}
        {/* <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Who
          </span>
          <select
            value={filters.waiterFilter}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                waiterFilter: e.target.value as "my-orders" | "all-waiters",
              }))
            }
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <option value="my-orders">My Orders</option>
            <option value="all-waiters">All Waiters</option>
          </select>
        </div> */}

        {/* Date */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Date
          </span>
          <select
            value={filters.dateFilter}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                dateFilter: e.target.value as "today" | "yesterday" | "this-week" | "custom",
              }))
            }
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this-week">This Week</option>
            <option value="custom">Custom Date</option>
          </select>
        </div>

        {/* Custom date inputs */}
        {filters.dateFilter === "custom" && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                From
              </span>
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                To
              </span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Sort
          </span>
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                sort: e.target.value as "latest" | "oldest",
              }))
            }
            className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          >
            <option value="latest">Latest Completed</option>
            <option value="oldest">Oldest Completed</option>
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <CompletedOrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>

          <Pagination
            total={total}
            page={page}
            limit={limit}
            onPageChange={setPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          No completed orders
        </div>
      )}
    </div>
  );
}