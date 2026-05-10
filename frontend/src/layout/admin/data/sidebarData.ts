import {
  LayoutDashboard,
  UtensilsCrossed,
  Shapes,
  Table2,
  ClipboardList,
  Users,
  User,
  BadgeDollarSign,
  BarChart3,
} from "lucide-react";

import type  { NavItem } from '../types/navigation'

export const sidebarItems: NavItem[] = [
  { id: 1, label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { id: 2, label: "Menu", path: "/admin/menu", icon: UtensilsCrossed },
  { id: 3, label: "Categories", path: "/admin/categories", icon: Shapes },
  { id: 4, label: "Tables", path: "/admin/tables", icon: Table2 },
  { id: 5, label: "Orders", path: "/admin/orders", icon: ClipboardList },
  { id: 6, label: "Staff", path: "/admin/staff", icon: Users },
  { id: 7, label: "Profile", path: "/admin/profile", icon: User },
  { id: 8, label: "users", path: "/admin/users", icon: Users },
  { id: 9, label: "Revenue Report", path: "/admin/revenue-report", icon: BarChart3 },
];