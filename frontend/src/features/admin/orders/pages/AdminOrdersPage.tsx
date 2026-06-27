// src/features/admin/orders/pages/OrdersPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Pagination from "../../../common/CommonPagination";
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

type OutletContextType = {
    searchVal?: string;
};
const AdminOrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   const outletContext = useOutletContext<OutletContextType>();
    const search = outletContext?.searchVal ?? "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearch(searchValue);
//       setPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchValue]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await orderService.getAllOrders({
          search,
          page
        });
        setOrders(res.data|| []);
        setTotal(res?.total || 0);
        setPage(res?.page || 1);
        setLimit(res?.limit || 10);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [search, page, limit]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Loading orders...
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="animate-pulse divide-y divide-gray-200 dark:divide-gray-800">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 p-4">
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      {/* <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total orders: {total}
          </p>
        </div>

        <div className="w-full lg:w-80">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by order id, status..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
      </div> */}

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          No orders found
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-800/70">
                  <tr className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <th className="px-4 py-4 font-semibold">Order ID</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Items</th>
                    <th className="px-4 py-4 font-semibold">Total</th>
                    <th className="px-4 py-4 font-semibold">Prepaid</th>
                    <th className="px-4 py-4 font-semibold">Pay Amount</th>
                    <th className="px-4 py-4 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => navigate(`/admin/order/${order._id}`)}
                      className="cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-4">
                        <p className="max-w-[180px] truncate font-medium text-gray-900 dark:text-gray-100">
                          #{order.orderId}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            statusClasses[order.orderStatus]
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {order.items?.length || 0}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        ₹{order.totalAmount}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                        ₹{order.prepaidAmount}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                        ₹{order.payAmount}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/order/${order._id}`);
                          }}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <Pagination
              total={total}
              page={page}
              limit={limit}
              onPageChange={setPage}
            //   onLimitChange={(value) => {
            //     setLimit(value);
            //     setPage(1);
            //   }}
            //   limitOptions={[5, 10, 20, 50]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrdersPage;