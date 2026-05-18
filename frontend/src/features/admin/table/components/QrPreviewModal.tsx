import { Download, X } from "lucide-react";

type Props = {
  open: boolean;
  title: string;
  qrDataUrl: string;
  onClose: () => void;
  onDownload: () => void;
};

export default function QrPreviewModal({
  open,
  title,
  qrDataUrl,
  onClose,
  onDownload,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Click download to save the QR image.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
          <img src={qrDataUrl} alt={title} className="mx-auto h-64 w-64 max-w-full object-contain" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}