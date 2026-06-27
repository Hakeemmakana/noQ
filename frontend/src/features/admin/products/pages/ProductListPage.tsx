// ProductListPage.tsx
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Pagination from "../../../common/CommonPagination";
import { productService } from "../service/productService";
import type {
    ICategory,
    IProduct,
    ProductFormValues,
    ProductOutletContext,
} from "../types/productTypes";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";
import ProductFormModal from "../components/ProductFormModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
const initialForm: ProductFormValues = {
    productName: "",
    category: "",
    description: "",
    price: "",
    type: "kitchen",
    stock: "",
    status: "available",
    productImage: null,
};

export default function ProductListPage() {
    const { searchVal } = useOutletContext<ProductOutletContext>();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<ProductFormValues>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<keyof ProductFormValues, string>>>({});
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editData, setEditData] = useState<IProduct | null>(null);
    const [deleteData, setDeleteData] = useState<IProduct | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Partial<Record<keyof ProductFormValues, string>> = {};

        if (!form.productName.trim()) newErrors.productName = "Product name is required";
        if (!form.category) newErrors.category = "Category is required";
        if (!form.description.trim()) newErrors.description = "Description is required";
        if (!form.price || Number(form.price) <= 0) newErrors.price = "Valid price is required";
        if (!form.status) newErrors.status = "Status is required";
        if (!form.type) newErrors.type = "Type is required";

        if (!form.stock || Number(form.stock) < 0) {
            newErrors.stock = "Valid stock is required";
        }

        if (!editData && !form.productImage) {
            newErrors.productImage = "Product image is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await productService.getProducts(searchVal, page,);
            setProducts(res?.data || []);
            setLimit(res.limit)
            setTotal(res?.total || 0);
        } catch (error) {
            errorToast(String(error));
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await productService.getCategories();
            setCategories(res || []);
        } catch (error) {
            errorToast(String(error))
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [searchVal]);

    useEffect(() => {
        fetchProducts();
    }, [page, limit, searchVal]);

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
        setEditData(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (product: IProduct) => {
        setEditData(product);
        setErrors({});
        setForm({
            productName: product.productName,
            category: typeof product.category === "string" ? product.category : product.category._id || "",
            description: product.description,
            price: String(product.price),
            type: product.type,
            stock: product.stock ? String(product.stock) : "",
            status: product.status,
            productImage: product.productImage,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setSubmitLoading(true);

            const formData = new FormData();
            formData.append("productName", form.productName);
            formData.append("category", form.category);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("type", form.type);
            formData.append("status", form.status);

            if (form.type === "quick"||form.type=='kitchen') {
                formData.append("stock", form.stock);
            }

            if (form.productImage) {
                formData.append("productImage", form.productImage);
            }

            if (editData) {
                await productService.editProduct(editData.id, formData);
                successToast("Product updated successfully");
            } else {
                await productService.addProduct(formData);
                successToast("Product added successfully");
            }

            setIsFormOpen(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            errorToast(String(error));
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteData?.id) return;

        try {
            setSubmitLoading(true);
            await productService.deleteProduct(deleteData.id);
            successToast("Product deleted successfully");
            setIsDeleteOpen(false);
            setDeleteData(null);
            fetchProducts();
        } catch (error) {
            errorToast(String(error));
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">


                <button
                    onClick={openAddModal}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-950">
                            <tr className="text-zinc-600 dark:text-zinc-300">
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                                        Loading...
                                    </td>
                                </tr>
                            ) : products.length > 0 ? (
                                products.map((item) => (
                                    <tr key={item.id} className="border-t border-zinc-200 dark:border-zinc-800">
                                        <td className="px-4 py-3">
                                            <img
                                                src={item.productImage}
                                                alt={item.productName}
                                                className="h-12 w-12 rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-zinc-900 dark:text-white">{item.productName}</td>
                                        <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                            {typeof item.category === "string" ? item.category : item.category?.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.status === "available"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                                    }`}
                                            >
                                                {item.status === "available" ? "Available" : "Unavailable"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                                            {item.type === "quick" ? "Quick" : "Kitchen"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteData(item);
                                                        setIsDeleteOpen(true);
                                                    }}
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                total={total}
                page={page}
                limit={limit}
                onPageChange={setPage}
            // onLimitChange={setLimit}
            // limitOptions={[10, 20, 50]}
            />
            <ProductFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                editData={editData}
                form={form}
                errors={errors}
                categories={categories}
                submitLoading={submitLoading}
                setForm={setForm}
                handleSubmit={handleSubmit}
            />

            <ProductDeleteModal
                isOpen={isDeleteOpen}
                deleteData={deleteData}
                onClose={() => setIsDeleteOpen(false)}
                onDelete={handleDelete}
                submitLoading={submitLoading}
            />

            {/* {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900">
                        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                {editData ? "Edit Product" : "Add Product"}
                            </h2>
                            <button onClick={() => setIsFormOpen(false)}>
                                <X className="text-zinc-500" size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name</label>
                                <input
                                    value={form.productName}
                                    onChange={(e) => setForm({ ...form, productName: e.target.value })}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.productName && <p className="mt-1 text-xs text-red-500">{errors.productName}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Category</label>
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
                                {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Status</label>
                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({ ...form, status: e.target.value as "available" | "unavailable" })
                                    }
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                >
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            type: e.target.value as "kitchen" | "stock",
                                            stock: e.target.value === "kitchen" ? "" : form.stock,
                                        })
                                    }
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                >
                                    <option value="kitchen">Kitchen</option>
                                    <option value="quick">Quick</option>
                                </select>
                            </div>

                            {form.type === "stock" && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Stock</label>
                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                    />
                                    {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
                                </div>
                            )}

                            <div>
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Price</label>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Description</label>
                                <textarea
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Photo</label>
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
                                        className="mt-3 h-20 w-20 rounded-xl object-cover border border-zinc-300 dark:border-zinc-700"
                                    />

                                )}
                                {errors.productImage && <p className="mt-1 text-xs text-red-500">{errors.productImage}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
                            <button
                                onClick={() => setIsFormOpen(false)}
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
            )} */}

            {/* {isDeleteOpen && deleteData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900">
                        <div className="mb-4 flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                            <img
                                src={deleteData.productImage}
                                alt={deleteData.productName}
                                className="h-14 w-14 rounded-lg object-cover"
                            />
                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Delete product</p>
                                <h3 className="font-semibold text-zinc-900 dark:text-white">{deleteData.productName}</h3>
                            </div>
                        </div>

                        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
                            Are you sure you want to delete this product?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsDeleteOpen(false)}
                                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700 dark:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={submitLoading}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {submitLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}