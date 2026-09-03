import React from "react";
import { NavLink } from "react-router-dom";
import type { NavItem } from "../types/layout";

interface RoleSidebarProps {
  roleTitle: string;
  navItems: NavItem[];
  logout:()=>void;
}

const RoleSidebar: React.FC<RoleSidebarProps> = ({ roleTitle, navItems,logout }) => {
  return (
    <aside className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-[270px] xl:flex-col xl:border-r xl:border-slate-200 xl:bg-white xl:px-4 xl:py-5 dark:xl:border-slate-800 dark:xl:bg-slate-950">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-md">
          {roleTitle.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Restaurant Panel
          </p>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {roleTitle}
          </h2>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
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
  );
};

export default RoleSidebar;