import { ShoppingCart, ArrowLeft } from "lucide-react";

interface CheckoutEmptyProps {
  onBackToCart: () => void;
}

const CheckoutEmpty = ({ onBackToCart }: CheckoutEmptyProps) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <ShoppingCart className="h-8 w-8 text-slate-600 dark:text-slate-300" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          No items in checkout
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your cart is empty. Add products in cart and continue checkout.
        </p>
        <button
          onClick={onBackToCart}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutEmpty;