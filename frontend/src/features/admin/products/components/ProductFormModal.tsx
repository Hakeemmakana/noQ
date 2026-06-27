// ProductFormModal.tsx
import { X } from "lucide-react";
import type { ICategory, IProduct, ProductFormValues } from "../types/productTypes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  editData: IProduct | null;
  form: ProductFormValues;
  errors: Partial<Record<keyof ProductFormValues, string>>;
  categories: ICategory[];
  submitLoading: boolean;
  setForm: React.Dispatch<React.SetStateAction<ProductFormValues>>;
  handleSubmit: () => void;
};

export default function ProductFormModal({
  isOpen,
  onClose,
  editData,
  form,
  errors,
  categories,
  submitLoading,
  setForm,
  handleSubmit,
}: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {editData ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose}>
            <X className="text-zinc-500" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Name
            </label>
            <input
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
            {errors.productName && (
              <p className="mt-1 text-xs text-red-500">{errors.productName}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "available" | "unavailable",
                })
              }
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as "kitchen" | "quick",
                  // stock: e.target.value === "kitchen" ? "" : form.stock,
                })
              }
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="kitchen">Kitchen</option>
              <option value="quick">Quick</option>
            </select>
          </div>

          {/* {form.type === "quick" && ( */}
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Stock
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
              {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
            </div>
          {/* )} */}

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Price
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, productImage: e.target.files?.[0] || null })
              }
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />

            {form.productImage && (
              <img
                src={
                  typeof form.productImage === "string"
                    ? form.productImage
                    : URL.createObjectURL(form.productImage)
                }
                alt="preview"
                className="mt-3 h-20 w-20 rounded-xl border border-zinc-300 object-cover dark:border-zinc-700"
              />
            )}

            {errors.productImage && (
              <p className="mt-1 text-xs text-red-500">{errors.productImage}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitLoading}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitLoading ? "Saving..." : editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}