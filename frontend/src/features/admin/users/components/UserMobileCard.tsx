// src/components/users/UserMobileCard.tsx
import { Trash2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import type { User } from "../types/types";

type UserMobileCardProps = {
  user: User;
  serial: number;
  onRequestStatusChange: (user: User) => void;
  onRequestDelete: (user: User) => void;
};

export default function UserMobileCard({
  user,
  serial,
  onRequestStatusChange,
  onRequestDelete,
}: UserMobileCardProps) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-start gap-3">
        <div className="pt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          {serial}
        </div>

        <UserAvatar user={user} className="h-12 w-12" />

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={user.status} onClick={() => onRequestStatusChange(user)} />

        <button
          onClick={() => onRequestDelete(user)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:border-slate-700 dark:text-rose-300 dark:hover:bg-rose-950/30"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}