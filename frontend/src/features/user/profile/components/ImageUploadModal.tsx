// src/components/profile/components/ImageUploadModal.tsx
type Props = {
  open: boolean;
  imagePreview: string | null;
  profilePic: string | null;
  selectedImage: File | null;
  imageLoading: boolean;
  onClose: () => void;
  onSelectImage: (file: File | null) => void;
  onSubmit: () => void;
};

export default function ImageUploadModal({
  open,
  imagePreview,
  imageLoading,
  selectedImage,
  onClose,
  onSelectImage,
  onSubmit,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Change profile image</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Upload a new image from your system
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 flex justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-28 w-28 rounded-[24px] object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-[24px] bg-slate-100 text-sm text-slate-500 dark:bg-slate-800">
              No image
            </div>
          )}
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Upload image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onSelectImage(e.target.files?.[0] || null)}
            className="block w-full text-sm"
          />
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!selectedImage || imageLoading}
            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          >
            {imageLoading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}