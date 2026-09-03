import { Types } from "mongoose";

export type CreateCartData = {
    userId: Types.ObjectId;
    hotelId: Types.ObjectId;
    items: {
        variantId:Types.ObjectId;
        itemId: Types.ObjectId;
        quantity: number;
    }[];
};
export function getVariantAndProductId(id:string):{productId:string,variantId:string}{
    const ids=id.split(':')
    return {productId:ids[0],variantId:ids[1]}
}


