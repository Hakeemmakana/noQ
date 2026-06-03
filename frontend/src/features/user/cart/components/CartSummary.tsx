// src/modules/menu/components/cart/CartSummary.tsx
import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  subtotal: number;
  itemCount: number;
  onCheckout: () => void;
  loading?: boolean;
};

const CartSummary: React.FC<Props> = ({
  subtotal,
  itemCount,
  onCheckout,
  loading = false,
}) => {
  const total = subtotal;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Order summary
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="space-y-3 border-y border-slate-200 py-4 dark:border-slate-800">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          {/* <span>Delivery</span>
          <span>Calculated at checkout</span> */}
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <span className="text-base font-semibold text-slate-900 dark:text-white">
          Total
        </span>
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          ₹{total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading || itemCount === 0}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-500 dark:hover:bg-teal-600"
      >
        Go to checkout
        <ArrowRight size={16} />
      </button>
    </aside>
  );
};

export default CartSummary;