import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logoutUser } from "./service/logutService";
import { errorToast, successToast } from "../../shared/utils/toastNotification";
import { userLogout } from "../../features/auth/authSlice/userAuthSlice";
import {  useState } from "react";

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const user=useSelector((state:RootState)=>state.userAuth.user)
  const isAuthenticated=useSelector((state:RootState)=>state.userAuth.isAuthenticated)
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <AppHeader
        title="Noq Hotel"
        subtitle="Waiter Management System"
        user={user}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />

      <main className="transition-colors">
        <Outlet />
      </main>
    </div>
  );
}