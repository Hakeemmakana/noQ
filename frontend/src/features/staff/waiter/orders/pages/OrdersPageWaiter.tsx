import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type { IOrderType } from "../types/orderTypes";
import OrderCard from "../components/OrderCard";
import Pagination from "../../../../common/CommonPagination";
import { errorToast } from "../../../../../shared/utils/toastNotification";

export default function OrdersPageWaiter() {
  const [orders, setOrders] = useState<IOrderType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getOrdersWithoutComplete({ page, limit });
      setOrders(res.data);
      setTotal(res.total);
      setLimit(res.limit)
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  // Reset page when limit changes
  useEffect(() => {
    setPage(1);
  }, [limit]);

  // Fetch when page/limit change
  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
        Orders
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
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
          No active orders
        </div>
      )}
    </div>
  );
}