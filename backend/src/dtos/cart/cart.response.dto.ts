import { Types } from "mongoose";
import { IMenuItem } from "../../models/menuItem";
import { ICart } from "../../models/cart";

export interface repoCartWithProduct {
    hotelId: Types.ObjectId,
    userId: Types.ObjectId
    items: {
        itemId: IMenuItem,
        quantity: number
    }[];
}
export interface cartProductDto {
    id: string;
    productName: string;
    price: number;
    productImage: string;
    type: string;
    description: string;
    quantity: number
}
export interface CartwithProductDto {
    items: cartProductDto[]
}
export function toCartWithProductDto(cartData:ICart): CartwithProductDto {
    return {
        items: cartData.items.map((item) => {
            const product =item.itemId as IMenuItem
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