import { useEffect, useState } from "react";
import type { Staff, StaffFormData } from "../types/staffTypes";
import {
  validateStaffForm,
  type StaffFormErrors,
} from "../validation/staffValidation";

interface StaffFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Staff | null;
  onClose: () => void;
  onSubmit: (data: StaffFormData) => Promise<void>;
}

const defaultForm: StaffFormData = {
  name: "",
  role: "waiter",
  email: "",
  password: "",
  status: "active",
};

export default function StaffFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: StaffFormModalProps) {
  const [form, setForm] = useState<StaffFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<StaffFormErrors>({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name,
        role: initialData.role,
        email: initialData.email,
        password: initialData.password,
        status: initialData.status,
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [mode, initialData, open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateStaffForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
        await onSubmit(form);
    } catch (error) {
        console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {mode === "add" ? "Add Staff" : "Edit Staff"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill the staff details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`h-12 w-full rounded-2xl border bg-white px-4 outline-none dark:bg-slate-950 dark:text-white ${
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
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="chef">Chef</option>
              <option value="waiter">Waiter</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`h-12 w-full rounded-2xl border bg-white px-4 outline-none dark:bg-slate-950 dark:text-white ${
                errors.email
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              name="password"
              type="text"
              value={form.password}
              onChange={handleChange}
              className={`h-12 w-full rounded-2xl border bg-white px-4 outline-none dark:bg-slate-950 dark:text-white ${
                errors.password
                  ? "border-red-500 focus:border-red-500 dark:border-red-500"
                  : "border-slate-200 focus:border-sky-500 dark:border-slate-700"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-2xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-2xl bg-sky-600 px-5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : mode === "add" ? "Add Staff" : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}