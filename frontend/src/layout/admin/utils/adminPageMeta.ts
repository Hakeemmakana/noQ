type AdminSection = "dashboard" | "menu" | "orders" | "tables" | "staff"| "users";

type PageMeta = {
  title: string;
  subtitle: string;
  isSearch?: boolean;
};

const adminMeta: Record<AdminSection, PageMeta> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Welcome back. Here's what is happening today.",
  },
  menu: {
    title: "Menu",
    subtitle: "Add, edit, and organize menu items.",
  },
  orders: {
    title: "Orders",
    subtitle: "Manage and track all customer orders.",
  },
  tables: {
    title: "Tables",
    subtitle: "Monitor and manage table availability.",
  },
  staff: {
    title: "Staff",
    subtitle: "Manage staff members and permissions.",
    isSearch:true
  },
  users: {
    title: "Users",
    subtitle: "View and manage user accounts and permissions.",
    isSearch:true
  },
};

 function getAdminSection(pathname: string): AdminSection {
  const parts = pathname.split("/").filter(Boolean);
  console.log(parts)
  return (parts[1] as AdminSection) || "dashboard";
}

export function getAdminPageMeta(pathname: string): PageMeta {
  const section = getAdminSection(pathname);
  console.log(section)
  return adminMeta[section];
}