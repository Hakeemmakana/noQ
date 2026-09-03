import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit2, Loader2, Plus, Search, Trash2 } from "lucide-react";
import MenuVariantModal from "../components/MenuVariantModal";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import type {
  IMenuVariant,
  IMenuVariantFormValues,
  IProduct,
} from "../types/menuVariantTypes";
import { menuVariantService } from "../service/menuVariantService";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";

const MenuVariantsPage: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingVariant, setEditingVariant] = useState<
    Partial<IMenuVariantFormValues> | undefined
  >(undefined);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteVariantId, setDeleteVariantId] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await menuVariantService.getProductWithVariants(productId);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const refreshProduct = async () => {
    if (!productId) return;
    const data = await menuVariantService.getProductWithVariants(productId);
    setProduct(data);
  };

  const variants = useMemo(() => {
    if (!product?.variants) return [];
    return product.variants.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [product, search]);

  const openAdd = () => {
    setModalMode("add");
    setEditingVariant(undefined);
    setEditingVariantId(null);
    setModalOpen(true);
  };

  const openEdit = (variant: IMenuVariant) => {
    setModalMode("edit");
    setEditingVariantId(variant._id ?? null);
    setEditingVariant({
      name: variant.name,
      image: variant.image ?? "",
      price: variant.price,
      stock: variant.stock ?? 0,
      stockFactor: variant.stockFactor ?? 1,
      nutrition: {
        servingSize: variant.nutrition?.servingSize ?? "",
        calories: variant.nutrition?.calories ?? 0,
        protein: variant.nutrition?.protein ?? 0,
        carbohydrates: variant.nutrition?.carbohydrates ?? 0,
        fat: variant.nutrition?.fat ?? 0,
        fiber: variant.nutrition?.fiber ?? 0,
        sugar: variant.nutrition?.sugar ?? 0,
        sodium: variant.nutrition?.sodium ?? 0,
      },
    });
    setModalOpen(true);
  };

  const handleSubmit = async (values: IMenuVariantFormValues) => {
    if (!productId || !product) return;

    try {
      setSaving(true);
      const fd = menuVariantService.toFormData(values, product.stockMode);
      let res
      if (modalMode === "add") {
        res=await menuVariantService.addVariant(productId, fd);
      } else if (editingVariantId) {
        res=await menuVariantService.editVariant(productId, editingVariantId, fd);
      }
      await refreshProduct();
      setModalOpen(false);
      successToast(res.message)
    }catch(error){
        if(typeof error=='string'){
            errorToast(error)
        }
     
    } finally {
      setSaving(false);
    }
  };

  const openDelete = (variantId?: string) => {
    if (!variantId) return;
    setDeleteVariantId(variantId);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!productId || !deleteVariantId) return;
    try {
      setSaving(true);
      const res=await menuVariantService.deleteVariant(productId, deleteVariantId);
      await refreshProduct();
      setDeleteOpen(false);
      setDeleteVariantId(null);
        successToast(res.message)
    }catch(err){
         if(typeof err=='string'){
            errorToast(err)
        }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500 dark:text-zinc-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 dark:bg-zinc-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="h-5 w-5 text-zinc-800 dark:text-zinc-200" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                {product.name} Variants
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Manage add, edit, delete and nutrition autofill.
              </p>
            </div>
          </div>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Variant
          </button>
        </div>

        {product.stockMode === "SHARED" && (
          <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Shared Stock
                </p>
                <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {product.stock ?? 0}
                </h2>
              </div>
              <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                Edit Stock
              </button>
            </div>
          </div>
        )}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search variants..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {variants.length} variant{variants.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {variants.map((variant) => (
            <div
              key={variant._id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-800">
                {variant.image ? (
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {variant.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      ₹{variant.price}
                    </p>
                  </div>

                  {product.stockMode === "PER_VARIANT" ? (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      Stock {variant.stock ?? 0}
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Factor {variant.stockFactor ?? 1}
                    </span>
                  )}
                </div>

                {variant.nutrition && (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <div>Cal: {variant.nutrition.calories ?? 0}</div>
                    <div>Protein: {variant.nutrition.protein ?? 0}g</div>
                    <div>Carbs: {variant.nutrition.carbohydrates ?? 0}g</div>
                    <div>Fat: {variant.nutrition.fat ?? 0}g</div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEdit(variant)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => openDelete(variant._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!variants.length && (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            No variants found.
          </div>
        )}
      </div>

      <MenuVariantModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        stockMode={product.stockMode}
        productName={product.name}
        initialData={editingVariant}
        loading={saving}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        loading={saving}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default MenuVariantsPage;