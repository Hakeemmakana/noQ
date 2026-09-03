export interface IMenuVariantFormValues {
  name: string;
  image: string;
  price: number;
  stock?: number;
  stockFactor?: number;
  nutrition: INutrition;
}
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

export interface IReqVariant {
    name: string;
    image: string;
    price: number;
    stock?: number;
    stockFactor?: number;
    nutrition: {
        servingSize?: string;
        calories?: number;
        protein?: number;
        carbohydrates?: number;
        fat?: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
    }
}

export function toMenuVariantDto(data:IMenuVariantFormValues):IReqVariant{
        return {
            name: data.name,
            image: data.image,
            price: data.price,
            stock: data.stock,
            stockFactor: data.stockFactor,
            nutrition: {
                servingSize: data.nutrition?.servingSize,
                calories: data.nutrition?.calories,
                protein: data.nutrition?.protein,
                carbohydrates: data.nutrition?.carbohydrates,
                fat: data.nutrition?.fat,
                fiber: data.nutrition?.fiber,
                sugar: data.nutrition?.sugar,
                sodium: data.nutrition?.sodium
            }
        }
    
}