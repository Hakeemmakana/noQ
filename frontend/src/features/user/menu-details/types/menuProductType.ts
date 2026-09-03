
export type StockMode = "SHARED" | "PER_VARIANT";

export type MenuVariantStatus = "available" | "out_of_stock";

export interface IMenuNutrition {
  servingSize?: string;
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface IMenuVariant {
  _id?:  string;
  name: string;
  image?: string;
  price: number;
  stock?: number;
  stockFactor?: number;
  status: MenuVariantStatus;
  nutrition?: IMenuNutrition;
}

export interface IMenuItem {
  _id?: string;
  itemName: string;
  itemImage: string;
  category?: string;
  description: string;
  type: "kitchen" | "quick";
  stock: number;
  stockMode: StockMode;
  variants: IMenuVariant[];
  status: string;
  hotelId?:string;
}

export interface ICartItem {
  _id?: string;
  itemId: string;
  variantId?: string;
  quantity?: number;
  count?: number;
  item?: {
    _id?: string;
  };
}