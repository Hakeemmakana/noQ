import React, { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import NutritionAiHelper from "./NutritionAiHelper";
import type { IMenuVariantFormValues, INutrition, StockMode } from "../types/menuVariantTypes";
import { validateMenuVariantForm, type MenuVariantValidationErrors } from "../validation/menuVariantValidation";

interface MenuVariantModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IMenuVariantFormValues) => void;
  mode: "add" | "edit";
  stockMode: StockMode;
  productName?: string;
  initialData?: Partial<IMenuVariantFormValues>;
  loading?: boolean;
}

const emptyNutrition = (): INutrition => ({
  servingSize: "",
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
});

const emptyForm = (): IMenuVariantFormValues => ({
  name: "",
  image: "",
  price: 0,
  stock: 0,
  stockFactor: 1,
  nutrition: emptyNutrition(),
});

export default function MenuVariantModal({
  open,
  onClose,
  onSubmit,
  mode,
  stockMode,
  productName = "",
  initialData,
  loading = false,
}: MenuVariantModalProps) {
  const [form, setForm] = useState<IMenuVariantFormValues>(emptyForm());
  const [errors, setErrors] = useState<MenuVariantValidationErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm({
      name: initialData?.name ?? "",
      image: initialData?.image ?? "",
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      stockFactor: initialData?.stockFactor ?? 1,
      nutrition: {
        servingSize: initialData?.nutrition?.servingSize ?? "",
        calories: initialData?.nutrition?.calories ?? 0,
        protein: initialData?.nutrition?.protein ?? 0,
        carbohydrates: initialData?.nutrition?.carbohydrates ?? 0,
        fat: initialData?.nutrition?.fat ?? 0,
        fiber: initialData?.nutrition?.fiber ?? 0,
        sugar: initialData?.nutrition?.sugar ?? 0,
        sodium: initialData?.nutrition?.sodium ?? 0,
      },
    });
    setPreviewUrl(initialData?.image ?? "");
  }, [open, initialData]);

  const canUseAi = useMemo(() => Boolean(productName.trim() && form.name.trim()), [productName, form.name]);

  const setField = (key: keyof IMenuVariantFormValues, value: string | number|File) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setNutrition = (key: keyof INutrition, value: string | number) => {
    setForm((prev) => ({ ...prev, nutrition: { ...prev.nutrition, [key]: value } }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setField("image", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateMenuVariantForm(form, stockMode);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {mode === "add" ? "Add Variant" : "Edit Variant"}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Manage variant details, image, price, stock and nutrition.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Variant Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Full, Half, 250ml..."
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Price
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setField("price", Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                required
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>

            {stockMode === "PER_VARIANT" ? (
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Stock
                </label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setField("stock", Number(e.target.value))}
                  min="0"
                  step="1"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  required
                />
                {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
              </div>
            ) : (
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Stock Factor
                </label>
                <input
                  type="number"
                  value={form.stockFactor}
                  onChange={(e) => setField("stockFactor", Number(e.target.value))}
                  min="0"
                  step="0.01"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Used only for shared stock mode.
                </p>
                {errors.stockFactor && <p className="mt-1 text-xs text-red-500">{errors.stockFactor}</p>}
              </div>
            )}

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Image
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <Upload className="h-4 w-4" /> Choose from laptop
                </button>
                <div className="relative flex-1">
                  <ImagePlus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={previewUrl || form.image}
                    readOnly
                    placeholder="Selected image preview"
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-3 pl-10 pr-4 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  />
                </div>
              </div>
              {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Nutrition</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Fill manually or use USDA autofill.
                </p>
              </div>

              <NutritionAiHelper
                productName={productName}
                variantName={form.name}
                onFill={(nutrition) => {
                  setForm((prev) => ({ ...prev, nutrition: { ...prev.nutrition, ...nutrition } }));
                }}
                disabled={!canUseAi}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Serving Size
                </label>
                <input
                  type="text"
                  value={form.nutrition.servingSize ?? ""}
                  onChange={(e) => setNutrition("servingSize", e.target.value)}
                  placeholder="100g, 250ml..."
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />
              </div>

              {(["calories", "protein", "carbohydrates", "fat", "fiber", "sugar", "sodium"] as const).map((field) => (
                <div key={field}>
                  <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                    {field === "calories"
                      ? "Calories"
                      : field === "protein"
                      ? "Protein (g)"
                      : field === "carbohydrates"
                      ? "Carbohydrates (g)"
                      : field === "fat"
                      ? "Fat (g)"
                      : field === "fiber"
                      ? "Fiber (g)"
                      : field === "sugar"
                      ? "Sugar (g)"
                      : "Sodium (mg)"}
                  </label>
                  <input
                    type="number"
                    value={form.nutrition[field] ?? 0}
                    onChange={(e) => setNutrition(field, Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : mode === "add" ? "Add Variant" : "Update Variant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}