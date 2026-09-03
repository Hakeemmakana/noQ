export type StockMode = "SHARED" | "PER_VARIANT";

export interface INutrition {
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
  _id?: string;
  name: string;
  image?: string;
  price: number;
  stock?: number;
  stockFactor?: number;
  status?: "available" | "out_of_stock";
  nutrition?: INutrition;
}

export interface IProduct {
  _id: string;
  name: string;
  image?: string;
  stockMode: StockMode;
  stock?: number;
  variants?: IMenuVariant[];
}

export interface IMenuVariantFormValues {
  name: string;
  image: string;
  price: number;
  stock: number;
  stockFactor: number;
  nutrition: INutrition;
}

export const emptyNutrition = (): INutrition => ({
  servingSize: "",
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
});

export const emptyVariantFormValues = (): IMenuVariantFormValues => ({
  name: "",
  image: "",
  price: 0,
  stock: 0,
  stockFactor: 1,
  nutrition: emptyNutrition(),
});