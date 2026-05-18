type AdminSection =
    | "dashboard"
    | "menu"
    | "orders"
    | "tables"
    | "staff"
    | "users"
    | "categories"
    | "profile"

type PageMeta = {
    title: string;
    subtitle: string;
    isSearch?: boolean;
    isSort?:boolean
};

const adminMeta: Record<AdminSection, PageMeta> = {
    dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back. Here's what is happening today.",
        isSort:true
    },
    menu: {
        title: "Menu Management",
        subtitle: "Add, edit, and organize menu items.",
    },
    orders: {
        title: "Orders Management",
        subtitle: "Manage and track all customer orders.",
    },
    tables: {
        title: "Tables Management",
        subtitle: "Manage hotel tables, capacities, status, QR downloads, and actions.",
        isSearch: true,
    },
    staff: {
        title: "Staff Management",
        subtitle: "Manage staff members and permissions.",
        isSearch: true
    },
    users: {
        title: "Users Management",
        subtitle: "View and manage user accounts and permissions.",
        isSearch: true
    },
    categories: {
        title: "Categories Management",
        subtitle: "Manage hotel product categories with add, edit, status change and delete.",
        isSearch: true,
    },
    profile: {
        title: "Profile Management",
        subtitle: "Manage hotel profile and security settings.",
        isSort:false
    },
};

function getAdminSection(pathname: string): AdminSection {
    const parts = pathname.split("/").filter(Boolean);
    return (parts[1] as AdminSection) || "dashboard";
}

export function getAdminPageMeta(pathname: string): PageMeta {
    const section = getAdminSection(pathname);
    return adminMeta[section];
}