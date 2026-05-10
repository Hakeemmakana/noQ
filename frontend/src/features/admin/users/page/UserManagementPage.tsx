// src/pages/admin/UserManagementPage.tsx
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import UserTable from "../components/UserTable";
import type { User, userResType } from "../types/types";
import ConfirmDialog from "../components/ConfirmDialog";
import { useOutletContext } from "react-router-dom";
import { getUsers, statusChange, deleteUser } from "../service/userService";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";

const PAGE_SIZE = 8;

type ConfirmAction =
  | { type: "delete"; user: User }
  | { type: "status"; user: User }
  | null;

export default function UserManagementPage() {
  const [users, setUsers] = useState<userResType | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const { searchVal } = useOutletContext<{ searchVal: string }>();

  // ✅ FIXED: Added page dependency + loading state
  useEffect(() => {
    const handleGetUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers(searchVal, page);
        setUsers(res.data);
      } catch (error: any) {
        errorToast(error.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    handleGetUsers();
  }, [searchVal, page]); 


  const handleDeleteConfirmed = async (id: string) => {
    try {
      await deleteUser(id);
      successToast("User deleted successfully");
     
      const newUsers = await getUsers(searchVal, page);
      setUsers(newUsers.data);
      
      // If current page is empty, go to previous page
      if (newUsers.data.totalPages < page && page > 1) {
        setPage(page - 1);
      }
    } catch (error: any) {
      errorToast(error.message || "Failed to delete user");
    }
  };

  const handleStatusConfirmed = async (id: string) => {
    try {
      const newStatus = confirmAction!.user.isVerified? "blocked" : "active";
      await statusChange(id, newStatus);
      successToast(`User ${newStatus.toLowerCase()}d successfully`);
      
      const newUsers = await getUsers(searchVal, page);
      setUsers(newUsers.data);
    } catch (error: any) {
      errorToast(error.message || "Failed to update status");
    }
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      await handleDeleteConfirmed(confirmAction.user._id );
    } else if (confirmAction.type === "status") {
      await handleStatusConfirmed(confirmAction.user._id);
    }

    setConfirmAction(null);
  };

  // ✅ FIXED: Safe conditional rendering
  if (loading) {
    return (
      <section className="min-h-full bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-12 w-12"></div>
          </div>
        </div>
      </section>
    );
  }

  const confirmTitle =
    confirmAction?.type === "delete"
      ? "Delete user?"
      : confirmAction?.type === "status" && confirmAction.user.isVerified
      ? "Block user?"
      : "Unblock user?";

  const confirmDescription =
    confirmAction?.type === "delete"
      ? `Are you sure you want to delete ${confirmAction.user.name}? This action cannot be undone.`
      : confirmAction?.type === "status" && confirmAction.user.isVerified
      ? `Are you sure you want to block ${confirmAction.user.name}?`
      : confirmAction?.type === "status"
      ? `Are you sure you want to unblock ${confirmAction.user.name}?`
      : "";

  const confirmButtonText =
    confirmAction?.type === "delete"
      ? "Delete"
      : confirmAction?.type === "status" && confirmAction.user.isVerified
      ? "Block"
      : "Unblock";

  const confirmVariant =
    confirmAction?.type === "delete" ? "danger" : "warning";

  return (
    <section className="min-h-full bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* ✅ FIXED: Safe prop passing */}
          <UserTable
            users={users?.data ?? []}
            currentPage={page}
            pageSize={PAGE_SIZE}
            onRequestStatusChange={(user) => setConfirmAction({ type: "status", user })}
            onRequestDelete={(user) => setConfirmAction({ type: "delete", user })}
          />

          {/* ✅ FIXED: Correct Pagination props */}
          {users && (
            <Pagination
              page={page}
              totalPages={users.totalPages ?? 1}
              totalItems={users.total ?? 0}
              currentCount={users.data?.length ?? 0} // ✅ Fixed: actual items on page
              onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
              onNext={() => setPage((prev) => Math.min(prev + 1, users.totalPages ?? 1))}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        title={confirmTitle}
        description={confirmDescription}
        confirmText={confirmButtonText}
        variant={confirmVariant}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
    </section>
  );
}