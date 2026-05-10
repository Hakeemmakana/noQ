import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: number;
  label: string;
  path: string;
  icon: LucideIcon;
}