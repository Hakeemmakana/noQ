import type { CategoryStatus } from "../types/categoryTypes";

type Props = {
  open: boolean;
  currentStatus?: CategoryStatus;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CategoryStatusModal({
  open,
  currentStatus,
  loading,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  const nextStatus = currentStatus === "active" ? "inactive" : "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Change Status
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to change status from{" "}
            <span className="font-semibold">{currentStatus}</span> to{" "}
            <span className="font-semibold">{nextStatus}</span>?
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}