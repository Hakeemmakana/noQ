import { Types } from "mongoose";
import { IMenuItem } from "../../models/menuItem";
import { ICart } from "../../models/cart";
import { IMenuVariant } from "../../models/menuVarient";

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
    prdouctVariant:string;
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
            const variant=product.variants.find(x=>x._id?.toString()==item.variantId.toString()) as IMenuVariant
            return {
                id: `${product._id?.toString()}:${variant?._id?.toString()}`,
                productName: product.itemName,
                prdouctVariant:variant.name,
                description: product.description,
                productImage:variant.image|| product.itemImage,
                // price: product?.price,
                price: variant.price,
                type: product.type,
                quantity: item.quantity
            }
        })
    }
}