import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Hotel, LogOut } from "lucide-react";
import { sidebarItems } from "../data/sidebarData";
import { logoutAdmin } from "../service/logutService";
import { errorToast, successToast } from "../../../shared/utils/toastNotification";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../features/auth/authSlice/adminAuthSlice";

const Sidebar: React.FC = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  async function handleLogout(){
    try {
      const res=await logoutAdmin()
      dispatch(adminLogout())
      successToast(res.message)
      navigate('/auth/adminLogin')
    } catch (error) {
      errorToast(error as string)
    }
  }
  return (
    <aside className="hidden xl:flex xl:h-screen xl:w-[270px] xl:flex-col xl:justify-between xl:border-r xl:border-[#E8E9F0] xl:bg-white">
      <div>
        <div className="flex items-center gap-3 px-6 pb-8 pt-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1D27F3] text-white shadow-sm">
            <Hotel size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-[-0.03em] text-[#141827]">
              NoQ Hotel
            </h1>
          </div>
        </div>

        <nav className="space-y-2 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#1D27F3] text-white shadow-sm"
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
      </div>

      <div className="border-t border-[#E8E9F0] p-4">
        <div className="flex items-center justify-between rounded-2xl bg-[#F7F7FB] px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Admin profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-[#202437]">Taza</p>
              <p className="text-xs text-[#8B90A7]">Admin</p>
            </div>
          </div>

          <button className="text-[#7B8098] transition hover:text-[#1D27F3]">
            <LogOut onClick={handleLogout} size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;