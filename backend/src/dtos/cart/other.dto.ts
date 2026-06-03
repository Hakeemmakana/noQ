import { Types } from "mongoose";

export type CreateCartData = {
    userId: Types.ObjectId;
    hotelId: Types.ObjectId;
    items: {
        itemId: Types.ObjectId;
        quantity: number;
    }[];
};

