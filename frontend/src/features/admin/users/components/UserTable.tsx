// src/components/users/UserTable.tsx
import { Trash2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import UserMobileCard from "./UserMobileCard";
import type { User } from "../types/types";

type UserTableProps = {
  users: User[];
  currentPage: number;
  pageSize: number;
  onRequestStatusChange: (user: User) => void;
  onRequestDelete: (user: User) => void;
};

export default function UserTable({
  users,
  currentPage,
  pageSize,
  onRequestStatusChange,
  onRequestDelete,
}: UserTableProps) {
  return (
    <>
      <div className="hidden md:block">
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
          <div className="col-span-1">No</div>
          <div className="col-span-5">User</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {users.map((user, index) => {
            const serial = (currentPage - 1) * pageSize + index + 1;

            return (
              <div
                key={user._id}
                className="grid grid-cols-12 items-center px-6 py-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
              >
                <div className="col-span-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {serial}
                </div>

                <div className="col-span-5 flex items-center gap-3">
                  <UserAvatar user={user} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
                  </div>
                </div>

                <div className="col-span-3 truncate text-sm text-slate-600 dark:text-slate-300">
                  {user.email}
                </div>

                <div className="col-span-2">
                  <StatusBadge
                    status={user.isVerified?'active':'blocked'}
                    onClick={() => onRequestStatusChange(user)}
                  />
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => onRequestDelete(user)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
                    aria-label={`Delete ${user.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
        {users.map((user, index) => {
          const serial = (currentPage - 1) * pageSize + index + 1;

          return (
            <UserMobileCard
              key={user._id}
              user={user}
              serial={serial}
              onRequestStatusChange={onRequestStatusChange}
              onRequestDelete={onRequestDelete}
            />
          );
        })}
      </div>
    </>
  );
}