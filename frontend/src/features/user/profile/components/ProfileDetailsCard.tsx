// src/components/profile/components/ProfileDetailsCard.tsx
import type { FieldErrors, ProfileFormData } from "../types/profileTypes";

type Props = {
  isEditMode: boolean;
  isPasswordMode: boolean;
  profileForm: ProfileFormData;
  profileErrors: FieldErrors;
  displayedDob: string;
  profileLoading: boolean;
  onOpenEdit: () => void;
  onCancelEdit: () => void;
  onSubmit: () => void;
  onChange: (key: keyof ProfileFormData, value: string) => void;
};

export default function ProfileDetailsCard({
  isEditMode,
  isPasswordMode,
  profileForm,
  profileErrors,
  displayedDob,
  profileLoading,
  onOpenEdit,
  onCancelEdit,
  onSubmit,
  onChange,
}: Props) {
  return (
    <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Profile details</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Name, email, phone, and date of birth
          </p>
        </div>

        {!isPasswordMode && (
          <button
            type="button"
            onClick={onOpenEdit}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Name
          </label>
          <input
            value={profileForm.name}
            disabled={!isEditMode}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:disabled:bg-slate-800"
            placeholder="Enter name"
          />
          {profileErrors.name && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Email
          </label>
          <input
            value={profileForm.email}
            disabled
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            placeholder="Email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Phone
          </label>
          <input
            value={profileForm.phone}
            disabled={!isEditMode}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:disabled:bg-slate-800"
            placeholder="Enter phone"
          />
          {profileErrors.phone && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Date of Birth
          </label>
          <input
            type="date"
            value={isEditMode ? profileForm.dob : displayedDob}
            disabled={!isEditMode}
            onChange={(e) => onChange("dob", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:disabled:bg-slate-800"
          />
          {profileErrors.dob && (
            <p className="mt-1 text-sm text-red-500">{profileErrors.dob}</p>
          )}
        </div>
      </div>

      {isEditMode && (
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={profileLoading}
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-sky-600 dark:hover:bg-sky-700"
          >
            {profileLoading ? "Saving..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}