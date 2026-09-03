import type { INewOrder } from "../types/orderTypes";

type Props = {
  order: INewOrder;
  section: "ready" | "picked";
  actionLoading: boolean;
  onAction: (orderId: string) => void | Promise<void>;
};

export default function ServicOrderCard({
  order,
  section,
  actionLoading,
  onAction,
}: Props) {
  const isReady = section === "ready";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Table
          </div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {order?.orderId?.tableId?.tableNumber}
          </div>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {order.time}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Customer
        </div>
        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
          {order?.orderId?.userId?.name}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Order
        </div>
        <div className="text-sm text-zinc-800 dark:text-zinc-200">
          {order.productQuantity} × {order.product}
        </div>
      </div>

      <div className="mb-3">
        {isReady ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Ready to Serve
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Picked
          </span>
        )}
      </div>

      <button
        onClick={() => onAction(order._id)}
        disabled={actionLoading}
        className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {actionLoading
          ? isReady
            ? "Picking..."
            : "Completing..."
          : isReady
          ? "Order Picked"
          : "Order Completed"}
      </button>
    </div>
  );
}