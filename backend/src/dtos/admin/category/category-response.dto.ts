import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";




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


