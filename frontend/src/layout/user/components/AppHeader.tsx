import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Moon, Sun, UserCircle2 } from "lucide-react";

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
  onProfileClick: () => void;
};

export default function AppHeader({
  title,
  subtitle,
  user,
  darkMode,
  onToggleTheme,
  onLogout,
  onProfileClick,
}: AppHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const initials =
    user?.name
      ?.split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              aria-controls="profile-dropdown"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
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

              {/* <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email || "guest@noqhotel.com"}
                </p>
              </div> */}

              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                id="profile-dropdown"
                role="menu"
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {user?.name || "Guest User"}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user?.email || "guest@noqhotel.com"}
                  </p>
                </div>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onProfileClick();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <UserCircle2 className="h-4 w-4" />
                  My Profile
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    onLogout();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}