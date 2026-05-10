import { Moon, Sun } from "lucide-react";

type User = {
  name: string;
  email?: string;
  imageUrl?: string;
};

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  user?: User | null;
  darkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
};

export default function AppHeader({
  title,
  subtitle,
  user,
  darkMode,
  onToggleTheme,
  onLogout,
}: AppHeaderProps) {
  const initials =
    user?.name
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                {initials}
              </div>
            )}

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email || "guest@noqhotel.com"}
              </p>
            </div>

            <button
              onClick={onLogout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}