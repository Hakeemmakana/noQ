import type{ LucideIcon } from "lucide-react";

export interface DashboardStat {
  id: number;
  title: string;
  value: string;
  badge: string;
  badgeVariant: "green" | "blue" | "orange";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface DashboardOrder {
  id: string;
  customer: string;
  table: string;
  status: "Completed" | "In Progress" | "New";
  amount: string;
}