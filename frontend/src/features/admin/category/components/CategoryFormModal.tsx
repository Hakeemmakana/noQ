import { useEffect, useState } from "react";
import type {
  CategoryFormData,
  CategoryStatus,
  ProductCategory,
} from "../types/categoryTypes";
import {
  validateCategoryForm,
  type CategoryFormErrors,
} from "../validation/categoryvalidation";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: ProductCategory | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
};

const defaultForm: CategoryFormData = {
  name: "",
  description: "",
  status: "active",
};

export default function CategoryFormModal({
  open,
  mode,
  initialData,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CategoryFormData>(defaultForm);
  const [errors, setErrors] = useState<CategoryFormErrors>({});

  useEffect(() => {
    if(!open)return 
    const timer = setTimeout(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        status: initialData.isAvailable?'active':'inactive',
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
    }, 0);
    return () => clearTimeout(timer);
  }, [mode, initialData, open]);

  if (!open) return null;

  const handleChange = (
    key: keyof CategoryFormData,
    value: string | CategoryStatus
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCategoryForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {mode === "add" ? "Add Category" : "Edit Category"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill the category details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter category name"
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition dark:bg-slate-950 dark:text-slate-100 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              rows={4}
              className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition dark:bg-slate-950 dark:text-slate-100 ${
                errors.description
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as CategoryStatus)
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="active">ACTIVE</option>
              <option value="inactive">INACTIVE</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : mode === "add" ? "Add Category" : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}