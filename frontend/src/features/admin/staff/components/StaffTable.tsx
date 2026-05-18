// src/pages/admin/components/StaffTable.tsx
import type { Staff } from "../types/staffTypes";
import { Pencil, Trash2 } from "lucide-react";

interface StaffTableProps {
  staff: Staff[];
  page: number;
  pageSize: number;
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onToggleStatus: (staff: Staff) => void;
}

export default function StaffTable({
  staff,
  page,
  pageSize,
  onEdit,
  onDelete,
  onToggleStatus,
}: StaffTableProps) {
  return (
    <>
      <div className="hidden md:block">
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
          <div className="col-span-1">No</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {staff.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <div className="col-span-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {(page - 1) * pageSize + index + 1}
              </div>
              <div className="col-span-3 font-semibold text-slate-900 dark:text-white">
                {item.name}
              </div>
              <div className="col-span-2 text-sm text-slate-600 dark:text-slate-300">
                {item.role}
              </div>
              <div className="col-span-3 text-sm text-slate-600 dark:text-slate-300">
                {item.email}
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => onToggleStatus(item)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold ${
                    item.status === "active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                  }`}
                >
                  {item.status}
                </button>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-sky-950/30"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
        {staff.map((item, index) => (
          <div key={item.id} className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  #{(page - 1) * pageSize + index + 1}
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.email}</p>
              </div>

              <button
                onClick={() => onToggleStatus(item)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  item.status === "active"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                }`}
              >
                {item.status}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item)}
                className="flex-1 rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}