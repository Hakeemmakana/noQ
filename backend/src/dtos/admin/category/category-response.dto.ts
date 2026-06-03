import { Types } from "mongoose";
import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";
import { IMenuItem } from "../../../models/menuItem";
import { ICart } from "../../../models/cart";




export interface ICategoryResponseDto {
    id: string;
    name: string;
    description: string;
    isAvailable: boolean;
}
export interface ICategoryResponseForUserDto {
    id: string;
    name: string;
}





function formatCategoryResponse(data: ICategory): ICategoryResponseDto {
    return {
        id: data._id?.toString() ?? '',
        name: data.name,
        description: data.description,
        isAvailable: data.isAvailable
    };
}
export function toPaginatedCategoryResponse(paginatedData: PaginatedResult<ICategory>): PaginatedResult<ICategoryResponseDto> {

    return {
        total: paginatedData.total || 0,
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        totalPages: paginatedData.totalPages,
        // We use our simple function inside the map
        data: (paginatedData.data || []).map(formatCategoryResponse)
    };
}
export function categoryResponseForUser(data: ICategory[]): ICategoryResponseForUserDto[] {
    return (data || []).map(formatCategoryResponseForUser)
}


function formatCategoryResponseForUser(data: ICategory): ICategoryResponseForUserDto {
    return {
        id: data._id?.toString() ?? '',
        name: data.name,
    };
}


export interface repoCartWithProduct {
    hotelId: Types.ObjectId,
    userId: Types.ObjectId
    items: {
        itemId: IMenuItem,
        quantity: number
    }[];
}
interface cartProductDto {
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
            console.log('this is in dto',item)
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