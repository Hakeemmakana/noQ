import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CategoryDeleteModal from "../components/CategoryDeleteModal";
import CategoryFormModal from "../components/CategoryFormModal";
import CategoryStatusModal from "../components/CategoryStatusModal";
import CategoryTable from "../components/CategoryTable";
import { categoryService } from "../services/categoryService";
import type {
    CategoryFormData,
    CategoryStatus,
    ProductCategory,
} from "../types/categoryTypes";
import { useOutletContext } from "react-router-dom";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";
import CommonPagination from "../../../common/CommonPagination";

type ContextType = {
    searchVal?: string;
};

const PAGE_SIZE = 8;

export default function ProductCategoryPage() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [limit,setLimit] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"add" | "edit">("add");
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState<ProductCategory | null>(null);

    const [statusOpen, setStatusOpen] = useState(false);
    const [statusItem, setStatusItem] = useState<ProductCategory | null>(null);

    const { searchVal } = useOutletContext<ContextType>();

    const fetchCategories = async (search = searchVal, currentPage = page) => {
        setLoading(true);
        try {
            const res = await categoryService.getUser(search, currentPage);
            setCategories(res.data);
            setTotal(res.total);
            setLimit(res.limit);
            setPage(res.page);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchCategories(searchVal, 1);
    }, [searchVal]);

    const handlePageChange = async (nextPage: number) => {
        setPage(nextPage);
        await fetchCategories(searchVal, nextPage);
    };

    const handleOpenAdd = () => {
        setSelectedCategory(null);
        setFormMode("add");
        setFormOpen(true);
    };

    const handleOpenEdit = (item: ProductCategory) => {
        setSelectedCategory(item);
        setFormMode("edit");
        setFormOpen(true);
    };

    const handleSubmitForm = async (data: CategoryFormData) => {
        setLoading(true);
        try {
            if (formMode === "add") {
                await categoryService.addcatogory(data);
                successToast('category created successfully')
            } else if (selectedCategory) {
                await categoryService.editcategory(selectedCategory.id, data);
                successToast('category updated successfully')
            }

            setFormOpen(false);
            await fetchCategories(searchVal, page);
        } catch (error) {
            errorToast(error as string)
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDelete = (item: ProductCategory) => {
        setDeleteItem(item);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteItem) return;

        setLoading(true);
        try {
            await categoryService.delete(deleteItem.id);
            setDeleteOpen(false);
            successToast('category delte successfully')
            setDeleteItem(null);
            await fetchCategories(searchVal, page);
        } catch (error) {
            errorToast(error as string || 'something went wrong')

        } finally {
            setLoading(false);
        }
    };

    const handleOpenStatusModal = (item: ProductCategory) => {
        setStatusItem(item);
        setStatusOpen(true);
    };

    const handleConfirmStatusChange = async () => {
        if (!statusItem) return;

        const nextStatus: CategoryStatus =
            statusItem.isAvailable ? "inactive" : "active";

        setLoading(true);
        try {
            await categoryService.changeStatus(statusItem.id, nextStatus);
            setStatusOpen(false);
            setStatusItem(null);
            successToast('status updated successfully')
            await fetchCategories(searchVal, page);
        } catch (error) {
            errorToast(error as string || 'something went wrong')
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-full bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </div>

                <CategoryTable
                    data={categories}
                    page={page}
                    pageSize={PAGE_SIZE}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                    onChangeStatus={handleOpenStatusModal}
                />

               
                <CommonPagination
                page={page}
                total={total}
                onPageChange={handlePageChange}
                limit={limit}
                />
            </div>

            <CategoryFormModal
                open={formOpen}
                mode={formMode}
                initialData={selectedCategory}
                loading={loading}
                onClose={() => setFormOpen(false)}
                onSubmit={handleSubmitForm}
            />

            <CategoryDeleteModal
                open={deleteOpen}
                loading={loading}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />

            <CategoryStatusModal
                open={statusOpen}
                currentStatus={statusItem?.isAvailable ? 'active' : 'inactive'}
                loading={loading}
                onClose={() => {
                    setStatusOpen(false);
                    setStatusItem(null);
                }}
                onConfirm={handleConfirmStatusChange}
            />
        </section>
    );
}