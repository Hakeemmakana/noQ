import type { IOrderType } from "../types/orderTypes";

type Props = {
  order: IOrderType;
  accepting: boolean;
  onReady: () => void | Promise<void>;
};

export default function OrderrCard({ order, accepting, onReady }: Props) {
  return (
    <div className="min-w-[260px] max-w-[260px] rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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

      <div className="mb-4">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Order
        </div>
        <div className="text-sm text-zinc-800 dark:text-zinc-200">
          {order.productQuantity} × {order.product}
        </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        In Preparation
      </span>
      </div>

      <button
        onClick={onReady}
        disabled={accepting}
        className="w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {accepting ? "Marking ready..." : "Mark as Ready"}
      </button>
    </div>
  );
}