// src/components/ordering/TableDetectedModal.tsx
import { CheckCircle2, ArrowRight, MapPin, Hash } from "lucide-react";
import AppModal from "../common/CommonAppModal";

type TableDetectedModalProps = {
  open: boolean;
  loading?: boolean;
  hotelName: string;
  hotelSlug: string;
  hotelImage: string;
  tableNumber: string | number;
  onClose: () => void;
  onContinue: () => void;
};

export default function TableDetectedModal({
  open,
  loading,
  hotelName,
  hotelSlug,
  hotelImage,
  tableNumber,
  onClose,
  onContinue,
}: TableDetectedModalProps) {
  return (
    <AppModal open={open} onClose={onClose} title="Table detected" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">QR verified successfully</p>
            <p className="text-sm text-emerald-600">Your table details are ready</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <img
            src={hotelImage}
            alt={hotelName}
            className="h-48 w-full object-cover"
          />

          <div className="space-y-4 p-5">
            <div>
              <h4 className="text-xl font-bold text-slate-900">{hotelName}</h4>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-600" />
                  <span>{hotelSlug}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Hash className="h-4 w-4 text-sky-600" />
                  <span>Table {tableNumber}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onContinue}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              Go to menu
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}