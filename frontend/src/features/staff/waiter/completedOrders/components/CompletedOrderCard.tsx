import type { ICompletedOrder } from "../types/orderTypes";

type Props = {
  order: ICompletedOrder;
};

export default function CompletedOrderCard({ order }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Table
          </div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {order.orderId.tableId.tableNumber}
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
          {order.orderId.userId.name}
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

      {order.waiterName && (
        <div className="mb-3">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Waiter
          </div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            {order.waiterName}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800/50">
          <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          Completed
        </span>
      </div>
    </div>
  );
}