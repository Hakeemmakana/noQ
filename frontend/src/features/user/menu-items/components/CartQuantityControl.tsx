// src/modules/menu/components/CartQuantityControl.tsx
import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  loading?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartQuantityControl({
  value,
  loading = false,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 p-1 dark:border-zinc-700 dark:bg-zinc-950">
      <button
        type="button"
        onClick={onDecrease}
        disabled={loading}
        aria-label="Remove one quantity"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 transition hover:bg-zinc-200 disabled:opacity-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        <Minus size={16} />
      </button>

      <span
        aria-label={`${value} items in cart`}
        className="min-w-[32px] text-center text-sm font-semibold text-zinc-900 dark:text-white"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={loading}
        aria-label="Add one quantity"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-500 dark:hover:bg-emerald-600"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}