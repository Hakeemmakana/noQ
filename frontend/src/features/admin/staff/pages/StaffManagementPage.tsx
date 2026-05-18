// src/pages/admin/StaffManagementPage.tsx
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import StaffTable from "../components/StaffTable";
import StaffFormModal from "../components/StaffFormModal";
import DeleteStaffDialog from "../components/DeleteStaffDialog";
import StaffStatusConfirmModal from "../components/StaffStatusConfirmModal";
import type { Staff, StaffFormData } from "../types/staffTypes";
import { addStaff, changeStaffStatus, deleteStaff, editStaff, getStaff } from "../service/staffService";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";
import CommonPagination from "../../../common/CommonPagination";

export default function StaffManagementPage() {
    const { searchVal } = useOutletContext<{ searchVal: string }>();

    const [staff, setStaff] = useState<Staff[]>([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit,setLimit]=useState(0)

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);
    const [refresh,setRefresh]=useState(false)
    const [statusTarget, setStatusTarget] = useState<Staff | null>(null);

    
    useEffect(() => {
        const fetchStaff = async (currentPage = page) => {
            try {
        const res = await getStaff(searchVal, currentPage);
        setStaff(res.data);
        setTotalItems(res.total);
        // setPage(res.page);
        setLimit(res.limit)
        
    } catch (error) {
        errorToast(error as string||'something went woring')
    }
};
        fetchStaff(page);
    }, [page, searchVal,refresh]);

    const handleOpenAdd = () => {
        setModalMode("add");
        setSelectedStaff(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (staff: Staff) => {
        setModalMode("edit");
        setSelectedStaff(staff);
        setModalOpen(true);
    };

    const handleSubmit = async (data: StaffFormData) => {
        try {

            if (modalMode === "add") {
                await addStaff(data);
                successToast('staff created successfully')
                setModalOpen(false)
            } else if (selectedStaff) {
                await editStaff(selectedStaff.id.toString(), data);
                successToast('staff updated successfully')
                setModalOpen(false)
            }
            setRefresh(prev => !prev)
        } catch (error) {
            errorToast(error as string)
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteStaff(deleteTarget.id.toString());
            setDeleteTarget(null);
            setRefresh(prev => !prev)
            successToast('Staff deleted successfully')
        } catch (error) {
            errorToast(error as string)
        }
    };

    const handleToggleStatus = (staff: Staff) => {
        setStatusTarget(staff);
    };

    const handleConfirmStatusChange = async () => {
        if (!statusTarget) return;

        try {
            const nextStatus = statusTarget.status === "active" ? "inactive" : "active";
            await changeStaffStatus(statusTarget.id.toString(), nextStatus);
            setStatusTarget(null);
            setRefresh(prev => !prev)
            successToast('status changed successfully')
        } catch (error) {
            errorToast(error as string)
        }
    };
     const handlePageChange = async (nextPage: number) => {
        setPage(nextPage);
    };
    return (
        <section className="min-h-full bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                        onClick={handleOpenAdd}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 text-sm font-semibold text-white hover:bg-sky-700"
                    >
                        <Plus size={18} />
                        Add Staff
                    </button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <StaffTable
                        staff={staff}
                        page={page}
                        pageSize={8}
                        onEdit={handleOpenEdit}
                        onDelete={setDeleteTarget}
                        onToggleStatus={handleToggleStatus}
                    />

                    <CommonPagination
                        page={page}
                        total={totalItems}
                        onPageChange={handlePageChange}
                        limit={limit}
                        
                    />
                </div>
            </div>

            <StaffFormModal
                open={modalOpen}
                mode={modalMode}
                initialData={selectedStaff}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <DeleteStaffDialog
                open={!!deleteTarget}
                staff={deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />

            <StaffStatusConfirmModal
                open={!!statusTarget}
                staff={statusTarget}
                onClose={() => setStatusTarget(null)}
                onConfirm={handleConfirmStatusChange}
            />
        </section>
    );
}