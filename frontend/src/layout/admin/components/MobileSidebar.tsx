import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Hotel, LogOut, X } from "lucide-react";
import { sidebarItems } from "../data/sidebarData";
import { logoutAdmin } from "../service/logutService";
import {
  errorToast,
  successToast,
} from "../../../shared/utils/toastNotification";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../features/auth/authSlice/adminAuthSlice";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logoutAdmin();
      dispatch(adminLogout());
      successToast(res.message);
      onClose();
      navigate("/auth/adminLogin");
    } catch (error) {
      errorToast(error as string);
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 xl:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col bg-white transition-transform duration-300 xl:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E8E9F0] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1D27F3] text-white">
              <Hotel size={20} />
            </div>
            <h2 className="text-lg font-extrabold text-[#141827]">
              NoQ Hotel
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#6D728B] transition hover:text-[#141827]"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#1D27F3] text-white"
                      : "text-[#6D728B] hover:bg-[#F4F5FB] hover:text-[#202437]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-[#E8E9F0] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F7F7FB] px-4 py-3 text-sm font-semibold text-[#202437] transition hover:bg-[#EEF1FF] hover:text-[#1D27F3]"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;