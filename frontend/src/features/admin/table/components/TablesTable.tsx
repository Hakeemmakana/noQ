import { Pencil, Trash2 } from "lucide-react";
import type { HotelTable, TableStatus, tableStatustoBack } from "../types/tableTypes";
import CapacityBadge from "./CapacityBadge";
import TableQrCard from "./TableQrCard";

type Props = {
  tables: HotelTable[];
  page: number;
  limit: number;
  qrMap: Record<string, string>;
  onEdit: (table: HotelTable) => void;
  onDelete: (table: HotelTable) => void;
  onPreviewQr: (table: HotelTable) => void;
  onDownloadQr: (table: HotelTable) => void;
  onChangeStatus: (id: string, status: TableStatus) => void;
};

const statusColors: Record<tableStatustoBack, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  inactive:
    "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};
// const statusColors: Record<TableStatus, string> = {
//   Available:
//     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
//   Occupied:
//     "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
//   Reserved:
//     "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
//   Inactive:
//     "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
// };

const statusOptions: TableStatus[] = ["active", "inactive"];

export default function TablesTable({
  tables,
  page,
  limit,
  qrMap,
  onEdit,
  onDelete,
  onPreviewQr,
  onDownloadQr,
  onChangeStatus,
}: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
          <div className="col-span-1">No</div>
          <div className="col-span-2">Number</div>
          <div className="col-span-2">Capacity</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">QR</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {tables.map((table, index) => (
            <div
              key={table.id}
              className="grid grid-cols-12 items-center px-6 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <div className="col-span-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {(page - 1) * limit + index + 1}
              </div>

              <div className="col-span-2">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{table.number}</p>
              </div>

              <div className="col-span-2">
                <CapacityBadge value={table.capacity} />
              </div>

              <div className="col-span-2">
                <select
                  value={table.status}
                  onChange={(e) => onChangeStatus(table.id, e.target.value as TableStatus)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold outline-none ${statusColors[table.status]}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status.toLowerCase()} className="text-slate-900">
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-3">
                <TableQrCard
                  number={table.number}
                  qrDataUrl={qrMap[table.id]}
                  onPreview={() => onPreviewQr(table)}
                  onDownload={() => onDownloadQr(table)}
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => onEdit(table)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label={`Edit ${table.number}`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(table)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:text-rose-300 dark:hover:bg-rose-950/30"
                  aria-label={`Delete ${table.number}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-200 lg:hidden dark:divide-slate-800">
        {tables.map((table, index) => (
          <div key={table.id} className="space-y-4 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  #{(page - 1) * limit + index + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">
                  {table.number}
                </h3>
              </div>
              <CapacityBadge value={table.capacity} />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <select
                value={table.status}
                onChange={(e) => onChangeStatus(table.id, e.target.value as TableStatus)}
                className={`rounded-full px-3 py-2 text-sm font-semibold outline-none ${statusColors[table.status]}`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status.toLowerCase()} className="text-slate-900">
                    {status}
                  </option>
                ))}
              </select>

              <TableQrCard
                number={table.number}
                qrDataUrl={qrMap[table.id]}
                onPreview={() => onPreviewQr(table)}
                onDownload={() => onDownloadQr(table)}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(table)}
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(table)}
                className="flex-1 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-950/30"
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