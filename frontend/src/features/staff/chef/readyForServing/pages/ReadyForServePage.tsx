import { useEffect, useState } from "react";
import { orderService } from "../service/orderService";
import type {  IOrderType} from "../types/orderTypes";

import OrderCart from "../components/OrderCard";
import { errorToast } from "../../../../../shared/utils/toastNotification";

export default function ReadyForServingPage() {
  const [orders, setOrders] = useState<IOrderType[]>([]);
  const [loading, setLoading] = useState(false);
  // const [readyingId, setReadyingId] = useState<string | null>(null);

  const fetchNewOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getNewOrders();
      setOrders(data);
    } catch (error) {
      errorToast(String(error));
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchNewOrders();
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
              
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-zinc-400">
          No reday for serving orders
        </div>
      )}
    </div>
  );
}