import React, { useEffect, useState } from "react";
import { Menu, Search,X } from "lucide-react";

interface HeaderConfig {
  title: string;
  subtitle?: string;
  isSearch?: boolean;
  isSort?:boolean
}

interface TopbarProps {
  header: HeaderConfig;
  setDebouncedSearch: (value:string)=>void;
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ setDebouncedSearch,header, onMenuClick }) => {
  const [searchVal, setSearchVal] = useState("");


useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchVal);
  }, 500);

  return () => clearTimeout(timer);
}, [searchVal,setDebouncedSearch]);
const handleClearSearch = () => {
    setSearchVal("");
    
  };

  const {
    title = "Staff",
    subtitle = "Welcome back",
    isSearch = false,
    isSort=true
  } = header;

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E6E8F0] bg-white text-[#202437] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 xl:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#141827] dark:text-white sm:text-[32px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[#7E839C] dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="w-full lg:w-auto">
        {isSearch ? (
          <div className="relative w-full lg:w-[320px]">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8C91A8] dark:text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value )}
              className="h-12 w-full rounded-2xl border border-[#E6E8F0] bg-white pl-11 pr-4 text-sm text-[#141827] outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
            />
            {searchVal && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
          </div>
        ) : isSort? (
          <div className="inline-flex w-fit rounded-full bg-[#ECECF4] p-1 dark:bg-slate-800">
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#1D27F3] shadow-sm dark:bg-slate-200 dark:text-slate-900">
              Monthly
            </button>
            <button className="rounded-full px-5 py-2 text-sm font-semibold text-[#8C91A8] dark:text-slate-300">
              Yearly
            </button>
          </div>
        ):(
          <></>
        )}
      </div>
    </header>
  );
};

export default Topbar;