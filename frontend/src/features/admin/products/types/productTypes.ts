// productTypes.ts
export type ProductType = "kitchen" | "quick";
export type ProductStatus = "available" | "unavailable";

export interface ICategory {
  _id?:string;
  id: string;
  name: string;
  description: string;
}

export interface IProduct {
  id: string;
  productName: string;
  productImage: string;
  category: ICategory | string;
  isAvailable: boolean;
  description: string;
  price: number;
  isDeleted: boolean;
  type: ProductType;
  stock?: number;
  status: ProductStatus;
  hotelId: string;
}

export interface ProductFormValues {
  productName: string;
  category: string;
  description: string;
  price: string;
  type: ProductType;
  stock: string;
  status: ProductStatus;
  productImage: File | null|string;
}

export interface ProductOutletContext {
  searchVal: string;
}