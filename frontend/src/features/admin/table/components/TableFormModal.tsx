import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
    HotelTable,
    TableCapacity,
    TableFormValues,
    TableStatus,
    tableStatustoBack,
} from "../types/tableTypes";
import {
    validateTableForm,
    type TableFormErrors,
} from "../validation/tableValidation";
import { errorToast, successToast } from "../../../../shared/utils/toastNotification";

type Props = {
    open: boolean;
    mode: "add" | "edit";
    initialData?: HotelTable | null;
    onClose: () => void;
    onSubmit: (values: TableFormValues) => Promise<void> | void;
};

const statusOptions: TableStatus[] = ["active", "inactive"];
const capacityOptions: TableCapacity[] = [2, 4, 6];

export default function TableFormModal({
    open,
    mode,
    initialData,
    onClose,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<TableFormValues>({
        number: "",
        capacity: 2,
        status: "active",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<TableFormErrors>({});

    useEffect(() => {
        if (initialData) {
            setForm({
                number: initialData.number,
                capacity: initialData.capacity,
                status: initialData.status,
            });
        } else {
            setForm({
                number: "",
                capacity: 2,
                status: "active",
            });
        }

        setErrors({});
    }, [initialData, open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateTableForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            await onSubmit(form);
            onClose();
            const message=mode=='add'?'created':'updated';
            successToast(`Table ${message} successfully`)
        } catch (error) {
            errorToast(error as string||'something went wrong')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {mode === "add" ? "Add Table" : "Edit Table"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Enter table number, initial status, and capacity.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Table Number
                        </label>
                        <input
                            value={form.number}
                            onChange={(e) => {
                                setForm((prev) => ({ ...prev, number: e.target.value }));
                                setErrors((prev) => ({ ...prev, number: undefined }));
                            }}
                            placeholder="Enter table number"
                            required
                            className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 dark:bg-slate-950 dark:text-slate-100 ${errors.number
                                    ? "border-red-500 focus:border-red-500 dark:border-red-500"
                                    : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
                                }`}
                        />
                        {errors.number && (
                            <p className="mt-1 text-sm text-red-500">{errors.number}</p>
                        )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Capacity
                            </label>
                            <select
                                value={form.capacity}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        capacity: Number(e.target.value) as TableCapacity,
                                    }))
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            >
                                {capacityOptions.map((capacity) => (
                                    <option key={capacity} value={capacity}>
                                        {capacity} Seats
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Initial Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        status: e.target.value as tableStatustoBack,
                                    }))
                                }
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status.toLowerCase()}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600"
                        >
                            {loading ? "Saving..." : mode === "add" ? "Add Table" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}