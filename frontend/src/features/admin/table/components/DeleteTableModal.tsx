import { X } from "lucide-react";
import type { HotelTable } from "../types/tableTypes";

type Props = {
  open: boolean;
  table: HotelTable | null;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
};

export default function DeleteTableModal({ open, table, onClose, onConfirm }: Props) {
  if (!open || !table) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Delete Table</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Please confirm before deleting this table.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Table Number: <span className="font-semibold">{table.number}</span>
          </p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            Capacity: <span className="font-semibold">{table.capacity} Seats</span>
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}