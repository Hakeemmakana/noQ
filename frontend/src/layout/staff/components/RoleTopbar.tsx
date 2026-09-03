import React from "react";
import { Menu } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ThemeToggle from "./ThemeToggle";
import type { AppNotification } from "../types/layout";

interface RoleTopbarProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  notifications: AppNotification[];
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;

}

const RoleTopbar: React.FC<RoleTopbarProps> = ({
  title,
  subtitle,
  onMenuClick,
  theme,
  onToggleTheme,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  return (
    <header className="sticky top-0 z-30 mb-6 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 xl:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            <Menu size={18} />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationDropdown notifications={notifications}
           onMarkAsRead={onMarkAsRead} onMarkAllAsRead={onMarkAllAsRead} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default RoleTopbar;