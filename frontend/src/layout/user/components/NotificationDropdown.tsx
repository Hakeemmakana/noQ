import React, { useEffect, useMemo, useRef, useState } from "react";
export interface AppNotification {
  _id: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}
import {
  Bell,
  Check,
  CheckCheck,
  Circle,
} from "lucide-react";

interface NotificationDropdownProps {
  notifications: AppNotification[];
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkNotificationAsRead = (
    event: React.MouseEvent<HTMLButtonElement>,
    notificationId: string
  ) => {
    event.stopPropagation();
    onMarkAsRead?.(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) return;

    onMarkAllAsRead?.();
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell size={18} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-[20px] rounded-full bg-rose-500 px-1.5 py-0.5 text-center text-[11px] font-semibold leading-none text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-50 mt-3 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Notifications
              </h3>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount > 1 ? "s" : ""
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item._id}
                  className={`group border-b border-slate-100 px-4 py-3 transition last:border-b-0 dark:border-slate-800 ${
                    item.isRead
                      ? "bg-white dark:bg-slate-900"
                      : "bg-indigo-50/60 dark:bg-indigo-950/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 shrink-0">
                      {item.isRead ? (
                        <Circle
                          size={9}
                          className="fill-slate-300 text-slate-300 dark:fill-slate-600 dark:text-slate-600"
                        />
                      ) : (
                        <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm text-slate-800 dark:text-slate-100 ${
                          item.isRead ? "font-medium" : "font-semibold"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        {item.message}
                      </p>

                      <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
                        {item.time}
                      </p>
                    </div>

                    {!item.isRead && (
                      <button
                        type="button"
                        onClick={(event) =>
                          handleMarkNotificationAsRead(event, item._id)
                        }
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-medium text-slate-500 opacity-0 transition hover:bg-white hover:text-indigo-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 group-hover:opacity-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                        aria-label={`Mark "${item.title}" as read`}
                        title="Mark as read"
                      >
                        <Check size={13} />
                        Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 text-center">
                <Bell
                  size={28}
                  className="mx-auto mb-2 text-slate-300 dark:text-slate-700"
                />

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No notifications
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;