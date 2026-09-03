import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type {  IOrderType} from "../types/orderTypes";

import OrderCart from "../components/OrderCard";
import { errorToast, successToast } from "../../../../../shared/utils/toastNotification";

export default function AcceptedOrdersPage() {
  const [orders, setOrders] = useState<IOrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [readyingId, setReadyingId] = useState<string | null>(null);

  const fetchAcceptedOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAcceptedOrders();
      setOrders(data);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleReady = async (orderId: string) => {
    try {
      setReadyingId(orderId);
      await orderService.redayOrder(orderId);
      successToast("Order Ready to serve");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      errorToast(String(error));
    } finally {
      setReadyingId(null);
    }
  };

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  return (
    <div className="space-y-4">

      {loading ? (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {/* Grid: 1 col on mobile, 2 on md, 3 on lg */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <OrderCart
                key={order._id}
                order={order}
                accepting={readyingId === order._id}
                onReady={() => handleReady(order._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          No Accpeted orders
        </div>
      )}
    </div>
  );
}