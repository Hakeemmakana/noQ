
import {
  ConciergeBell,
  ReceiptText,
  Zap,
  CircleCheck,
  CreditCard,
} from "lucide-react";
import type { NavItem } from "../types/layout";

export const waiterNavItems: NavItem[] = [
  { label: "Service Order", path: "/staff/waiter/service-order", icon: ConciergeBell },
  { label: "Orders", path: "/staff/waiter/orders", icon: ReceiptText },
  { label: "Quick Items", path: "/staff/waiter/quick-items", icon: Zap },
  { label: "Completed Orders", path: "/staff/waiter/completed-orders", icon: CircleCheck },
  { label: "Billing", path: "/staff//waiter/billing", icon: CreditCard },
];