import { Download, Expand } from "lucide-react";

type Props = {
  number: string;
  qrDataUrl: string;
  onPreview: () => void;
  onDownload: () => void;
};

export default function TableQrCard({ number, qrDataUrl, onPreview, onDownload }: Props) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPreview}
        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        title={`Preview QR for ${number}`}
      >
        <img src={qrDataUrl} alt={`QR for ${number}`} className="h-14 w-14 rounded-lg object-contain" />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/10 group-hover:opacity-100 dark:group-hover:bg-white/10">
          <Expand size={14} className="text-slate-700 dark:text-slate-100" />
        </span>
      </button>

      <button
        onClick={onDownload}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Download size={16} />
        QR
      </button>
    </div>
  );
}