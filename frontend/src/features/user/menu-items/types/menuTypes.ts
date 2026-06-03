// src/modules/menu/types/menu.types.ts
export type ItemType = "all" | "quick" | "kitchen";
export type ProductType = "quick" | "kitchen";
export type ProductStatus = "available" | "out_of_stock";

export interface ICategory {
  id: string;
  name: string;
}

export interface IMenuProduct {
  id: string;
  productName: string;
  productImage: string;
  category: ICategory | string;
  description: string;
  price: number;
  type: ProductType;
  status: ProductStatus;
  stock?: number;
  cartCount?: number;
}

export interface MenuFilters {
  search: string;
  category: string;
  type: ItemType;
  price: string;
}

export interface MenuListApiResponse {
  data: IMenuProduct[];
  total: number;
  page: number;
  limit: number;
}

export interface CartLine {
  itemId: string;
  quantity: number;
}

export interface CartResponse {
  items: CartLine[];
}