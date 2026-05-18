
export type StaffRole =  "chef" | "waiter";
export type StaffStatus = "active" | "inactive";

export interface Staff {
  id: number;
  name: string;
  role: StaffRole;
  email: string;
  password: string;
  status: StaffStatus;
}

export interface StaffListResponse {
  data: Staff[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface StaffFormData {
  name: string;
  role: StaffRole;
  email: string;
  password: string;
  status: StaffStatus;
}