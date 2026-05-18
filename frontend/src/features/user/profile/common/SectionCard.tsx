// src/components/common/SectionCard.tsx
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function SectionCard({ title, subtitle, children, action }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {action}
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}