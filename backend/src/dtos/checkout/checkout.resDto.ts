import { ICart } from "../../models/cart";
import { IMenuItem } from "../../models/menuItem";
import { cartProductDto } from "../cart/cart.response.dto";


export interface checkoutWithProductDto {
    total: number
    items: cartProductDto[]
}

export function toCheckoutResDto(cartData: ICart, total: number): checkoutWithProductDto {
    return {
        total: total,
        items: cartData.items.map((item) => {
            const product = item.itemId as IMenuItem
            return {
                id: product._id?.toString() ?? '',
                productName: product.itemName,
                description: product.description,
                productImage: product.itemImage,
                price: product.price,
                type: product.type,
                quantity: item.quantity

            }
        })
    }
}
export interface IStockIssueItem {
    productId: string | undefined;
    productName: string;
    requestedQty: number;
    availableStock: number;
}
export interface IStockValidationResponse {
    hasStockIssue: boolean;
    items: IStockIssueItem[];
}

export interface IOrderandPayResDto {
    clientSecret: string;
    paymentIntentId: string;
}
export interface IOrderNowRsDto {
    itemLength:number;
    orderId: string;
}
export type IPostCheckoutResDto =
    | { type: 'STOCK_ISSUE'; payload: IStockValidationResponse }
    | { type: 'STRIPE_PAYMENT'; payload: IOrderandPayResDto }
    | { type: 'ORDER_SUCCESS'; payload: IOrderNowRsDto };
