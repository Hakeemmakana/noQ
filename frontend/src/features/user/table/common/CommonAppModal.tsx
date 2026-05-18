// src/components/common/AppModal.tsx
import type { ReactNode } from "react";

type AppModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function AppModal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: AppModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <div className={`w-full ${maxWidth} overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-2xl`}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>

          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}