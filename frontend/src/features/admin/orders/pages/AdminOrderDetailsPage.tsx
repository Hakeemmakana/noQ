import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "../service/orderService";
import type { IOrder, IOrderItem, OrderStatus } from "../types/orderTypes";

const itemStatusStyles: Record<OrderStatus, string> = {
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

const orderStatusStyles: Record<OrderStatus, string> = {
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

const fallbackImage =
  "https://placehold.co/120x120/e5e7eb/6b7280?text=No+Image";

const AdminOrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) {
        setError("Order id is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await orderService.getOrderById(id);
        setOrder(data || null);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const renderItemTotal = (item: IOrderItem) => {
    return item.total ?? item.price * item.quantity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Back
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Back
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          Order not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        Back
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Complete information about this order
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                orderStatusStyles[order.orderStatus]
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
              <p className="mt-1 font-medium break-all">{order.orderId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Table No</p>
              <p className="mt-1 font-medium break-all">{order.tableId.tableNumber}</p>
            </div>

            {/* <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
              <p className="mt-1 font-medium break-all">{order.userId}</p>
            </div> */}

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Restaurent</p>
              <p className="mt-1 font-medium break-all">{order.hotelId.restaurantName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="mt-1 font-medium">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            {/* <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Updated At</p>
              <p className="mt-1 font-medium">
                {order.updatedAt
                  ? new Date(order.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div> */}
          </div>

          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ordered Items</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {order.items?.length || 0} items
              </span>
            </div>

            <div className="space-y-4">
              {order.items?.length ? (
                order.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/40"
                  >
                    <div className="flex flex-col gap-4 p-4 sm:flex-row">
                      <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:w-24">
                        <img
                          src={item?.productId?.itemImage || fallbackImage}
                          alt={item?.productId?.itemName}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                              {item?.productId?.itemName}
                            </h3>
                            {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Item ID: {item._id || "N/A"}
                            </p> */}
                          </div>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                              itemStatusStyles[item.status || order.orderStatus]
                            }`}
                          >
                            {item.status || order.orderStatus}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <div className="rounded-xl bg-white p-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Quantity
                            </p>
                            <p className="mt-1 font-semibold">{item.quantity}</p>
                          </div>

                          <div className="rounded-xl bg-white p-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Unit Price
                            </p>
                            <p className="mt-1 font-semibold">₹{item.price}</p>
                          </div>

                          <div className="rounded-xl bg-white p-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Total 
                            </p>
                            <p className="mt-1 font-semibold">
                              ₹{renderItemTotal(item)}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-3 dark:bg-gray-900">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Payment Status
                            </p>
                            <p className="mt-1 truncate font-semibold">
                              {item.paymentStatus || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  No items found in this order
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold">Payment</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total amount</span>
                <span className="font-medium">₹{order.totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Prepaid</span>
                <span className="font-medium">₹{order.prepaidAmount}</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-3 text-base dark:border-gray-800">
                <span className="font-semibold">Pay amount</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  ₹{order.payAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Items count</span>
                <span className="font-medium">{order.items?.length || 0}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Order status</span>
                <span className="font-medium capitalize">{order.orderStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;