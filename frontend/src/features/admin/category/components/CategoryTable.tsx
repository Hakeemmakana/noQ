import { Pencil, Trash2 } from "lucide-react";
import type { ProductCategory } from "../types/categoryTypes";
import StatusBadge from "./StatusBadge";

type Props = {
  data: ProductCategory[];
  page: number;
  pageSize: number;
  onEdit: (item: ProductCategory) => void;
  onDelete: (item: ProductCategory) => void;
  onChangeStatus: (item: ProductCategory) => void;
};

export default function CategoryTable({
  data,
  page,
  pageSize,
  onEdit,
  onDelete,
  onChangeStatus,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="hidden md:block">
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
          <div className="col-span-3">Name</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Status</div>
          {/* <div className="col-span-1">Deleted</div> */}
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center px-6 py-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
            >
              <div className="col-span-3">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">#{item.id}</p>
              </div>

              <div className="col-span-4">
                <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>

              <div className="col-span-2">
                <StatusBadge status={item.isAvailable?'active':'inactive'} onClick={() => onChangeStatus(item)} />
              </div>

              {/* <div className="col-span-1">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.isDeleted
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {item.isDeleted ? "Yes" : "No"}
                </span>
              </div> */}

              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-sky-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(item)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
        {data.map((item, index) => (
          <div key={item.id} className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {(page - 1) * pageSize + index + 1}. {item.name}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={item.isAvailable?'active':'inactive'} onClick={() => onChangeStatus(item)} />
              
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(item)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 dark:border-slate-700 dark:text-sky-300 dark:hover:bg-sky-950/30"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => onDelete(item)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:text-rose-300 dark:hover:bg-rose-950/30"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}