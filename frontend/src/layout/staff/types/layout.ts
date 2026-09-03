import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon  ;
}

export interface AppNotification {
  _id: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}