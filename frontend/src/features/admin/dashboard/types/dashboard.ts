export type DashboardStatBadgeVariant = "green" | "blue" | "orange";

export interface DashboardStat {
  id: string|number;
  title: string;
  value: string | number;
  badge?: string;
  badgeVariant?: DashboardStatBadgeVariant;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconBg?: string;
  iconColor?: string;
}

export interface TopProduct {
  productId: string;
  productName: string;
  productImage?: string | null; // note: backend typo; keep as-is
  quantity: number;
  revenue: number;
}

export interface DashboardResponse {
  totalOrder: number;
  completedOrder: number;
  totalRevenue: number;
  topProducts: TopProduct[];
}

export interface DashboardFilters {
  type: "today" | "yesterday" | "this_week" | "custom";
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
}
export interface DashboardChartPoint {
  label: string; // e.g. "Jan", "2024-09-01"
  revenue: number;
  profit: number;
}