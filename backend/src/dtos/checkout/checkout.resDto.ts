import { ICart } from "../../models/cart";
import { IMenuItem } from "../../models/menuItem";
import { IMenuVariant } from "../../models/menuVarient";
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
            const variant=product.variants.find(x=>x._id?.toString()==item.variantId.toString()) as IMenuVariant
            return {
                id: product._id?.toString() ?? '',
                productName: product.itemName,
                prdouctVariant:'vari temp youwill change when checkout',
                description:variant.name,
                // description: product.description,
                productImage:variant.image|| product.itemImage,
                price: variant.price,
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

