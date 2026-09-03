import {
  Wallet,
  BadgeDollarSign,
  Percent,
} from "lucide-react";
import type {  DashboardStat } from "../types/dashboard";

export const dashboardStats: DashboardStat[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$54,200",
    badge: "+12.5%",
    badgeVariant: "green",
    icon: Wallet,
    iconBg: "bg-[#E8F8EE]",
    iconColor: "text-[#2FAA61]",
  },
  {
    id: 2,
    title: "Total Profit",
    value: "$41,500",
    badge: "+8.2%",
    badgeVariant: "blue",
    icon: BadgeDollarSign,
    iconBg: "bg-[#EEF0FF]",
    iconColor: "text-[#4F5BFF]",
  },
  {
    id: 3,
    title: "Platform Fee",
    value: "$1,200",
    badge: "Fixed",
    badgeVariant: "orange",
    icon: Percent,
    iconBg: "bg-[#FFF2E8]",
    iconColor: "text-[#ED8B3A]",
  },
];

