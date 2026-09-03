// src/layouts/app/AppLayout.tsx
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logoutUser } from "./service/logutService";
import { errorToast, successToast } from "../../shared/utils/toastNotification";
import { userLogout } from "../../features/auth/authSlice/userAuthSlice";
import { useEffect,  useState } from "react";
import { getNotificaton, markAllAsRead, markAsRead } from "./service/notificationService";
import type { AppNotification } from "./components/NotificationDropdown";
import { getSocket } from "../../socket.ts/socket";

export type AppOutletContext = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppLayout() {
  const user = useSelector((state: RootState) => state.userAuth.user);
  const userId=user?._id
  const isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
   const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

 
  useEffect(() => {
    const root = document.documentElement;
    setDarkMode(root.classList.contains("dark"));
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleToggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDarkMode(root.classList.contains("dark"));
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      dispatch(userLogout());
      successToast(res.message);
      navigate("/auth/login");
    } catch (error) {
      errorToast(error as string);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
      if (!userId)return 
      const fetchNotifications = async () => {
        try {
          const data = await getNotificaton();
          setNotifications(data);
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        }
      }
      fetchNotifications()
      const eventName='userNotification'
      const socket = getSocket()
      
      socket.on("connect", () => {
        if (userId) {
          socket.emit("joinUserRoom", { userId });
        }
      });
  
      if (socket.connected && userId) {
        socket.emit("joinUserlRoom", { userId });
      }
  
      socket.on(eventName, (res) => {
        const newNotif = res.data
        setNotifications((prev) => [newNotif, ...prev]);
      });
  
      return () => {
        socket.emit("leaveUserRoom", { userId });
        socket.off(eventName);
        socket.off('connect');
      };
    },[ userId,])
  const handleMarkAsRead = async (notificationId: string) => {
    try {

      await markAsRead( notificationId);

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

      await markAllAsRead()
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
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <AppHeader
        title="Noq Hotel"
        subtitle="Waiter Management System"
        user={user}
        darkMode={darkMode}
        search={search}
        onSearchChange={setSearch}
        onToggleTheme={handleToggleTheme}
        onToggleCart={() => setCartOpen((prev) => !prev)}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <main className="transition-colors">
        <Outlet
          context={{
            search,
            setSearch,
            cartOpen,
            setCartOpen,
          }}
        />
      </main>
    </div>
  );
}