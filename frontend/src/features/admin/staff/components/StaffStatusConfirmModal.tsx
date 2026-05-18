// src/pages/admin/components/StaffStatusConfirmModal.tsx
import type { Staff } from "../types/staffTypes";

interface StaffStatusConfirmModalProps {
  open: boolean;
  staff: Staff | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StaffStatusConfirmModal({
  open,
  staff,
  onClose,
  onConfirm,
}: StaffStatusConfirmModalProps) {
  if (!open || !staff) return null;

  const nextStatus = staff.status === "active" ? "inactive" : "active";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Change Staff Status
          </h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to change <span className="font-semibold">{staff.name}</span>
            {" "}from <span className="font-semibold">{staff.status}</span> to{" "}
            <span className="font-semibold">{nextStatus}</span>?
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-2xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="h-11 rounded-2xl bg-amber-600 px-5 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}