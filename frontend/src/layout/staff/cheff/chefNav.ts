
import {
  // LayoutDashboard,
  UtensilsCrossed,
  CircleCheck,
  ConciergeBell,
  BadgeCheck,
} from "lucide-react";
import type { NavItem } from "../types/layout";

export const chefNavItems: NavItem[] = [
  // { label: "Dashboard", path: "/staff/chef/dashboard", icon: LayoutDashboard },
  { label: "New Orders", path: "/staff/chef/new-orders", icon: UtensilsCrossed },
  { label: "Accepted Orders", path: "/staff/chef/accepted-orders", icon: CircleCheck },
  { label: "Ready for Serving", path: "/staff/chef/ready-for-serving", icon: ConciergeBell },
  { label: "Completed Orders", path: "/staff/chef/completed-orders", icon: BadgeCheck },
];