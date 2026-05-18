// src/components/common/Drawer.tsx
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({
  open,
  title,
  description,
  onClose,
  children,
}: Props) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 transition ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-slate-200 bg-white shadow-2xl transition duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {title}
                </h2>
                {description && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </aside>
    </>
  );
}