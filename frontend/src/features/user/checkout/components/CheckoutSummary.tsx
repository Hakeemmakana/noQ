interface CheckoutSummaryProps {
  subtotal: number;
  gst: number;
  total: number;
  loading?: boolean;
  itemCount: number;
  onOrderNow: () => void;
  onPayAndOrder: () => void;
}

const CheckoutSummary = ({
  subtotal,
  loading,
  itemCount,
  onOrderNow,
  onPayAndOrder,
}: CheckoutSummaryProps) => {
  return (
    <aside className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Order Summary
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Ready to place order
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {itemCount} item{itemCount > 1 ? "s" : ""} in your checkout preview.
        </p>
      </div>

      <div className="space-y-4 py-6">
        {/* <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>GST</span>
          <span className="font-medium">₹{gst.toFixed(2)}</span>
        </div> */}

        <div className="border-t border-dashed border-slate-300 pt-4 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onPayAndOrder}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {loading ? "Processing..." : "Pay & Order"}
        </button>

        <button
          onClick={onOrderNow}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          {loading ? "Processing..." : "Order Now"}
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        Review items in cart if you need to change quantity.
      </div>
    </aside>
  );
};

export default CheckoutSummary;