import { Loader2, Minus, Plus } from "lucide-react";

interface ProductQuantityControlProps {
  quantity: number;
  loading?: boolean;
  disabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductQuantityControl({
  quantity,
  loading = false,
  disabled = false,
  onIncrease,
  onDecrease,
}: ProductQuantityControlProps) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || loading || quantity <= 0}
        className="flex h-11 w-11 items-center justify-center text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-200 dark:hover:bg-zinc-800"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="flex h-11 min-w-12 items-center justify-center border-x border-zinc-200 px-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || loading}
        className="flex h-11 w-11 items-center justify-center text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-200 dark:hover:bg-zinc-800"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}