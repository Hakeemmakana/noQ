import type { CheckoutItem } from "../types/checkoutTypes";

interface CheckoutItemCardProps {
  item: CheckoutItem;
}

const CheckoutItemCard = ({ item }: CheckoutItemCardProps) => {
  const itemTotal = item.quantity * item.price;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="flex gap-4">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          <img
            src={item.productImage}
            alt={item.productName}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                {item.productName}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {item.type}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Qty {item.quantity}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                ₹{item.price.toFixed(2)} × {item.quantity}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                ₹{itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CheckoutItemCard;