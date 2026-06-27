import { AlertTriangle, X } from "lucide-react";

type StockIssueItem = {
  productId: string;
  productName: string;
  availableStock: number;
  requestedQty: number;
};

type Props = {
  open: boolean;
  items: StockIssueItem[];
  onClose: () => void;
};

const StockIssueModal = ({ open, items, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-950/40">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Stock issue found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Some items do not have enough stock for your requested quantity.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[340px] space-y-3 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.productId}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    {item.productName}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Requested: {item.requestedQty}
                  </p>
                  <p className="text-sm text-rose-600 dark:text-rose-400">
                    Available stock: {item.availableStock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockIssueModal;