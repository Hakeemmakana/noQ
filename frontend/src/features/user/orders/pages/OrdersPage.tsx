// src/features/admin/orders/pages/OrdersPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../service/orderService";
import type { IOrder, OrderStatus } from "../types/orderTypes";

const statusClasses: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  confirmed:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  preparing:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  served:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  cancelled:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const OrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getAllOrders();
        setOrders(data || []);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold">Orders</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2 h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2 h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 text-red-600 dark:bg-gray-950 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total orders: {orders.length}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          No orders found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <button
              key={order._id}
              onClick={() => navigate(`/order/${order._id}`)}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Order ID
                  </p>
                  <h2 className="mt-1 line-clamp-1 text-base font-semibold">
                    #{order.orderId}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    statusClasses[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between gap-4">
                  {/* <span>Table</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {order.tableId}
                  </span> */}
                </div>

                <div className="flex justify-between gap-4">
                  <span>Items</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {order.items?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Total</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ₹{order.totalAmount}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Prepaid</span>
                  <span>₹{order.prepaidAmount}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Pay amount</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ₹{order.payAmount}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  View details
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;