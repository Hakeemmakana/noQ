import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Topbar from "./components/Topbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAdminPageMeta } from "./utils/adminPageMeta";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = useSelector(
    (state: RootState) => state.adminAuth.isAuthenticated
  );

  useEffect(() => {
    if (!admin) {
      navigate("/auth/adminLogin");
    }
  }, [admin, navigate]);

  const header = getAdminPageMeta(location.pathname);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#141827] dark:bg-slate-950 dark:text-white">
      <Sidebar />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="min-h-screen flex-1 xl:ml-[270px]">
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
          <Topbar
            header={header}
            setDebouncedSearch={setDebouncedSearch}
            onMenuClick={() => setIsMobileSidebarOpen(true)}
          />

          <div className="mt-6 sm:mt-8">
            <Outlet context={{ searchVal: debouncedSearch }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;