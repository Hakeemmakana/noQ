import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  UserCircle2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

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
  search: string;
  onSearchChange: (value: string) => void;
  onToggleTheme: () => void;
  onToggleCart: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
};

export default function AppHeader({
  title,
  subtitle,
  user,
  darkMode,
  search,
  onSearchChange,
  onToggleTheme,
  // onToggleCart,
  onLogout,
  onProfileClick,
}: AppHeaderProps) {
  const navigate=useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isMenuPage = pathSegments[pathSegments.length - 1] === "menu";
  
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
    <header className="sticky top-0 z-40 overflow-visible border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="overflow-visible px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 shrink-0">
            <h1 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
              {title}
            </h1>
            {subtitle ? (
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* 🟢 Desktop Search: Only shows if isMenuPage is true */}
          {isMenuPage ? (
            <div className="mx-2 hidden min-w-0 flex-1 md:block">
              <div className="relative z-0 mx-auto max-w-xl">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search menu items..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-slate-950"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1" /> // Spacer when search is missing
          )}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={()=>navigate('/cart')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

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

            <div className="relative z-50" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isProfileOpen}
                aria-controls="profile-dropdown"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
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

                <ChevronDown
                  className={`hidden h-4 w-4 text-slate-500 transition-transform sm:block ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div
                  id="profile-dropdown"
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
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

        {/* 🟢 Mobile Search: Wrapped inside condition to hide on other pages */}
        {isMenuPage && (
          <div className="mt-3 md:hidden">
            <div className="relative z-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search menu items..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}