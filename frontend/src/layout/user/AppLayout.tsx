import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logoutUser } from "./service/logutService";
import { errorToast, successToast } from "../../shared/utils/toastNotification";
import { userLogout } from "../../features/auth/authSlice/userAuthSlice";

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(false);
const {user,isAuthenticated}=useSelector((state:RootState)=>state.userAuth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
if (!isAuthenticated) {
  return <Navigate to="/auth/login" replace />;
}
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDarkMode(root.classList.contains("dark"));
  };

  const handleLogout = async() => {
    try {
          const res=await logoutUser()
          dispatch(userLogout())
          successToast(res.message)
          navigate('/auth/login')
        } catch (error) {
          errorToast(error as string)
        }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <AppHeader
        title="Noq Hotel"
        subtitle="Waiter Management System"
        user={user}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
      />

      {/* <main className="px-4 py-6 sm:px-6 lg:px-8"> */}
        <Outlet />
      {/* </main> */}
    </div>
  );
}