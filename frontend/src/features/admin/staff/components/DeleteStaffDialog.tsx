// src/pages/admin/components/DeleteStaffDialog.tsx
import type { Staff } from "../types/staffTypes";

interface DeleteStaffDialogProps {
  open: boolean;
  staff: Staff | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteStaffDialog({
  open,
  staff,
  onClose,
  onConfirm,
}: DeleteStaffDialogProps) {
  if (!open || !staff) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Delete Staff
        </h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <span className="font-semibold">{staff.name}</span> ({staff.role})?
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="h-11 rounded-2xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-11 rounded-2xl bg-rose-600 px-5 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}