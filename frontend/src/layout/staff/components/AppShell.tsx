import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RoleSidebar from "./RoleSidebar";
import MobileRoleSidebar from "./MobileRoleSidebar";
import RoleTopbar from "./RoleTopbar";
import { useTheme } from "../hooks/useTheme";
import type { AppNotification, NavItem } from "../types/layout";
import { useDispatch, useSelector } from "react-redux";
import { staffLogout } from "../../../features/auth/authSlice/staffAuthSlice";
import { errorToast, successToast } from "../../../shared/utils/toastNotification";
import { getNotificaton, logoutStaff, markAllAsRead, markAsRead } from "../service/orderService";
import type { RootState } from "../../../app/store";
import { getSocket } from "../../../socket.ts/socket";

interface AppShellProps {
  roleTitle: string;
  navItems: NavItem[];
}

const AppShell: React.FC<AppShellProps> = ({ roleTitle, navItems }) => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const res = await logoutStaff();
      dispatch(staffLogout());
      successToast(res.message);
      navigate("/auth/staffLogin");
    } catch (error) {
      errorToast(error as string);
    }
  };


  

  const staffType = useSelector(
    (state: RootState) => state.staffAuth.role
  );
  const hotelId = useSelector(
    (state: RootState) => state.staffAuth.staff?.hotelId
  );
  useEffect(() => {
    if (!staffType || !hotelId)return 
    const fetchNotifications = async () => {
      try {
        const data = await getNotificaton(staffType!);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    }
    fetchNotifications()
    const eventName = staffType === "chef" ? "chefNotification" : "waiterNotification";
    const socket = getSocket()
    
    socket.on("connect", () => {
      if (hotelId) {
        socket.emit("joinHotelRoom", { hotelId });
      }
    });

    if (socket.connected && hotelId) {
      socket.emit("joinHotelRoom", { hotelId });
    }

    socket.on(eventName, (res) => {
      const newNotif = res.data
      setNotifications((prev) => [newNotif, ...prev]);
    });

    return () => {
      socket.emit("leaveHotelRoom", { hotelId });
      socket.off(eventName);
      socket.off('connect');
    };
  },[ hotelId, staffType])

  const handleMarkAsRead = async (notificationId: string) => {
    try {

      await markAsRead(staffType!, notificationId);

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {

      await markAllAsRead(staffType!)
      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };
  const currentPage = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <RoleSidebar roleTitle={roleTitle} navItems={navItems} logout={handleLogout} />

      <MobileRoleSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        roleTitle={roleTitle}
        navItems={navItems}
        logout={handleLogout}
      />

      <main className="min-h-screen xl:ml-[270px]">
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-8">
          <RoleTopbar
            title={currentPage?.label || `${roleTitle} Panel`}
            subtitle={`Manage ${roleTitle.toLowerCase()} workflow`}
            onMenuClick={() => setIsMobileSidebarOpen(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AppShell;