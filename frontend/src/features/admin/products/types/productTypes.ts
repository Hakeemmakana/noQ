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
  stockMode: "SHARED" | "PER_VARIANT";
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
  stockMode: "SHARED" | "PER_VARIANT";
  status: ProductStatus;
  productImage: File | null|string;
}

export interface ProductOutletContext {
  searchVal: string;
}

// import type React from "react";

// export interface ICategory {
//   id: string;
//   name: string;
// }

export interface IProductVariant {
  _id?: string;
  name: string;
  image?: string;
  price: number;
  stock?: number;
  stockFactor?: number;
  status: "available" | "out_of_stock";
}

// export interface IProduct {
//   id: string;
//   productName: string;
//   category: ICategory | string;
//   description: string;
//   type: "kitchen" | "quick";
//   stock: number;
//   stockMode: "SHARED" | "PER_VARIANT";
//   productImage: string;
//   isAvailable?: boolean;
//   isDeleted?: boolean;
//   status: "available" | "out_of_stock";
//   variant: IProductVariant[];
// }

// export interface ProductFormValues {
//   productName: string;
//   category: string;
//   description: string;
//   type: "kitchen" | "quick";
//   stock: string;
//   stockMode: "SHARED" | "PER_VARIANT";
//   productImage: File | string | null;
//   status: "available" | "out_of_stock";
// }

// export interface ProductVariantFormValues {
//   name: string;
//   image: File | string | null;
//   price: string;
//   stock: string;
//   stockFactor: string;
//   status: "available" | "out_of_stock";
// }

// export interface ProductOutletContext {
//   searchVal: string;
// }