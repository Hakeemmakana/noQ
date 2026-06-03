// src/modules/menu/components/AddToCartButton.tsx
import { ShoppingCart } from "lucide-react";

type Props = {
  loading?: boolean;
  onClick: () => void;
  disabled?: boolean;
  quantity?: number;
};

export default function AddToCartButton({
  loading = false,
  onClick,
  disabled = false,
  quantity = 0,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={
        loading
          ? "Adding item to cart"
          : quantity > 0
          ? `Add item to cart, currently ${quantity} in cart`
          : "Add item to cart"
      }
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-600"
    >
      <ShoppingCart size={16} />
      {loading ? "Adding..." : `Add to Cart${quantity > 0 ? ` (${quantity})` : ""}`}
    </button>
  );
}