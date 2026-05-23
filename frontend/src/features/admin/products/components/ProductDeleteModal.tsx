// ProductDeleteModal.tsx
import type { IProduct } from "../types/productTypes";

type Props = {
  isOpen: boolean;
  deleteData: IProduct | null;
  onClose: () => void;
  onDelete: () => void;
  submitLoading: boolean;
};

export default function ProductDeleteModal({
  isOpen,
  deleteData,
  onClose,
  onDelete,
  submitLoading,
}: Props) {
  if (!isOpen || !deleteData) return null;

  return (
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
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              {deleteData.productName}
            </h3>
          </div>
        </div>

        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
          Are you sure you want to delete this product?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={submitLoading}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
          >
            {submitLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}