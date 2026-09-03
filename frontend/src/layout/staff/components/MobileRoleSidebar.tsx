import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import type { NavItem } from "../types/layout";

interface MobileRoleSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle: string;
  navItems: NavItem[];
  logout:()=>void;
}

const MobileRoleSidebar: React.FC<MobileRoleSidebarProps> = ({
  isOpen,
  onClose,
  roleTitle,
  navItems,
  logout
}) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 transition xl:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[290px] transform border-r border-slate-200 bg-white p-4 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 xl:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Restaurant Panel
            </p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {roleTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <br />
        <button
          onClick={logout}
          type="button"
          className="mt-auto w-full rounded-xl bg-gray-500 px-4 py-3 text-white"
        >
          Logout
        </button>
      </aside>

    </>
  );
};

export default MobileRoleSidebar;