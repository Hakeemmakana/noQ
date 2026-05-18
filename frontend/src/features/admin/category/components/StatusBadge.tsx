import type { CategoryStatus } from "../types/categoryTypes";

type Props = {
  status: CategoryStatus;
  onClick?: () => void;
};

export default function StatusBadge({ status, onClick }: Props) {

  const isActive =status==='active'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-w-[110px] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition ${
        isActive
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
          : "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50"
      }`}
    >
      {status}
    </button>
  );
}