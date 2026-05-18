// src/components/common/InputField.tsx
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function InputField({ label, error, className = "", ...props }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition dark:bg-slate-950 dark:text-slate-100 ${
          error
            ? "border-red-500 focus:border-red-500 dark:border-red-500"
            : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}