import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type { INewOrder } from "../types/orderTypes";

import AcceptedOrderrCard from "../components/QuickOrderCard";
import { errorToast, successToast } from "../../../../../shared/utils/toastNotification";

export default function QuickOrderPage() {
  const [orders, setOrders] = useState<INewOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const fetchNewOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getQuickOrders();
      setOrders(data);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (orderId: string) => {
    try {
      setAcceptingId(orderId);
      await orderService.servedOrder(orderId);
      successToast("Order accepted");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      errorToast(String(error));
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    fetchNewOrders();
  }, []);

  return (
    <div className="space-y-4">
      {/* <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
        New Orders
      </h1> */}

      {loading ? (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          Loading...
        </div>
      ) : orders.length > 0 ? (
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          {/* Grid: 1 col on mobile, 2 on md, 3 on lg */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <AcceptedOrderrCard
                key={order._id}
                order={order}
                accepting={acceptingId === order._id}
                onAccept={() => handleAccept(order._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          No new orders
        </div>
      )}
    </div>
  );
}