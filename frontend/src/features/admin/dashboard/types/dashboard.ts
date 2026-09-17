// types/dashboard.ts
import type { LucideIcon } from "lucide-react";
export type DashboardRangeType =
  | "today"
  | "yesterday"
  | "this_week"
  | "this_month"
  | "custom";

export interface DashboardFilters {
  type: DashboardRangeType;
  startDate?: string;
  endDate?: string;
}

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  badge?: string;
  badgeVariant?: "green" | "blue" | "orange";
  // icon?: React.ReactNode;
  icon?: LucideIcon
}

export interface TopProduct {
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  revenue: number;
}

export interface TopCategory {
  categoryId: string;
  categoryName: string;
  quantity: number;
  revenue: number;
}

export interface RevenueTrendPoint {
  label: string; // e.g. "10 AM", "Day 1", "Week 2", "09 Sep"
  revenue: number;
  orders?: number;
}

export interface DashboardResponse {
  totalOrder: number;
  completedOrder: number;
  totalRevenue: number;
  topProducts: TopProduct[];
  topCategories: TopCategory[]; // ensure backend returns this
  revenueTrend: RevenueTrendPoint[]; // ensure backend returns this
}