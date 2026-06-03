// src/modules/menu/components/MenuFilterDrawer.tsx
import MenuFiltersSidebar from "./MenuFiltersSidebar";
import type { ICategory, MenuFilters } from "../types/menuTypes";

type Props = {
  open: boolean;
  onClose: () => void;
  filters: MenuFilters;
  categories: ICategory[];
  onChange: (filters: MenuFilters) => void;
  onReset: () => void;
};

export default function MenuFilterDrawer({
  open,
  onClose,
  filters,
  categories,
  onChange,
  onReset,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
      <div className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-white p-4 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ✕
          </button>
        </div>

        <MenuFiltersSidebar
          filters={filters}
          categories={categories}
          onChange={onChange}
          onReset={onReset}
        />
      </div>
    </div>
  );
}