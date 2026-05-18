export type CategoryStatus = "active" | "inactive";

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  isAvailable:boolean;
  status:string
}

export interface CategoryFormData {
  name: string;
  description: string;
  status: CategoryStatus;
}

export interface CategoryListResponse {
  data: ProductCategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}