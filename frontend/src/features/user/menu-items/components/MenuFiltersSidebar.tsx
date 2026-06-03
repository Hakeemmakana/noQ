// src/modules/menu/components/MenuFiltersSidebar.tsx
import type { ICategory, ItemType, MenuFilters } from "../types/menuTypes";

type Props = {
  filters: MenuFilters;
  categories: ICategory[];
  onChange: (filters: MenuFilters) => void;
  onReset: () => void;
};

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "quick", label: " Quick" },
  { value: "kitchen", label: " Kitchen" },
];

export default function MenuFiltersSidebar({
  filters,
  categories,
  onChange,
  onReset,
}: Props) {
  return (
    <aside className="sticky top-4 space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Filters
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
        >
          Reset all
        </button>
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Type */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Type
        </label>
        <div className="flex flex-col gap-1.5">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...filters, type: opt.value as ItemType })}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                filters.type === opt.value
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-400 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-700"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-emerald-900"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-zinc-100 dark:border-zinc-800" />

      {/* Max Price */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Max price
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
            ₹
          </span>
          <input
            type="number"
            min="0"
            value={filters.price}
            onChange={(e) => onChange({ ...filters, price: e.target.value })}
            placeholder="Any price"
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-7 pr-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:ring-emerald-900"
          />
        </div>
      </div>
    </aside>
  );
}