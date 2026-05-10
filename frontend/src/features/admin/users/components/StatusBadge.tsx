// src/components/users/StatusBadge.tsx
import type { UserStatus } from "../types/types";

type StatusBadgeProps = {
  status: UserStatus;
  onClick: () => void;
};

export default function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const active = status === "active";

  return (
    <button
      onClick={onClick}
      className={`inline-flex min-w-[100px] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
          : "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50"
      }`}
    >
      {status}
    </button>
  );
}