import mongoose  from "mongoose";
import { IMenuItem } from "../../models/menuItem";

export interface menuItemResDto {
    id?:mongoose.Types.ObjectId;
    productName: string;
    category:mongoose.Types.ObjectId;
    description: string;
    price: number;
    type: 'kitchen' | 'quick';
    status: 'available' | 'unavailable';
    stock?: number;
    productImage: string
}
export interface IPaginatedMenuItemData<T> {
    total: number;
    page: number;
    limit: number;
    data: T[]
}

export function covertMenuOutputDto(data:IMenuItem):menuItemResDto{
    return {
        id:data._id!,
        productName:data.itemName,
        category:data.category,
        description:data.description,
        price:data.price,
        type:data.type,
        productImage:data.itemImage,
        status:data.isAvailable?'available':'unavailable',
        stock:data.stock

    }
}

export function toPaginatedMenuItemResponse(paginatedData: IPaginatedMenuItemData<IMenuItem>): IPaginatedMenuItemData<menuItemResDto> {
    return {
        total: paginatedData.total || 0,
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        data: (paginatedData.data || []).map(covertMenuOutputDto)
    };
}
