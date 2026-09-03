import type { OrderStatus } from "../../../../user/orders/types/orderTypes";
import type { IOrderType } from "../types/orderTypes";

type Props = {
    order: IOrderType;
};

const itemStatusStyles: Record<OrderStatus, string> = {
    pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    preparing:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    ready_to_serve:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    picked:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    completed:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    cancelled:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};
export default function OrderCard({ order }: Props) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
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
            </div>

            <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${itemStatusStyles[order.status as OrderStatus ]
                    }`}
            >
                {order.status}
            </span>
        </div>
    );
}