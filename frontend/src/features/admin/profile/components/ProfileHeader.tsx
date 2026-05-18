// src/components/profile/components/ProfileHeader.tsx
type Props = {
  name: string;
  profilePic: string | null;
  onEditImage: () => void;
};

export default function ProfileHeader({
  name,
  profilePic,
  onEditImage,
}: Props) {
  return (
    <>
      <div className="h-32 bg-slate-900 dark:bg-slate-800" />

      <div className="px-4 pb-6 sm:px-6">
        <div className="-mt-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="relative">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-28 w-28 rounded-[24px] border-4 border-white object-cover shadow-lg dark:border-slate-900"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-[24px] border-4 border-white bg-slate-200 text-3xl font-bold text-slate-600 shadow-lg dark:border-slate-900 dark:bg-slate-800 dark:text-slate-300">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                type="button"
                onClick={onEditImage}
                className="absolute -bottom-2 right-0 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
                aria-label="Edit profile image"
              >
                ✎
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Personal profile and security settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}