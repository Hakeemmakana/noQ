// src/modules/menu/types/cart.types.ts
export interface CartProduct {
  id: string;
  productName: string;
  price: number;
  productImage?: string;
  description?: string;
  quntity?:number
}

export interface CartItem {
  id?: string;
  productId?: string;
  quantity: number;
  product?: CartProduct;
  productName: string;
  item?: CartProduct;
  price?: number;
  productImage?: string;
  description?: string;
  quntity?:number
}

export interface CartData {
  items: CartProduct[];
}
// export interface CartData {
//   items: CartItem[];
// }