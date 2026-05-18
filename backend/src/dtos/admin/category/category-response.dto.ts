import { ICategory } from "../../../models/category";




export interface ICategoryResponseDto {
    id: string;
    name: string;
    description: string;
    isAvailable: boolean;
}

interface IPaginatedData<T>{
    total:number;
    page:number;
    limit:number;
    data:T[]
}


 function formatCategoryResponse(data: ICategory): ICategoryResponseDto {
    return {
        id: data._id?.toString()??'',
        name: data.name,
        description:data.description,
        isAvailable:data.isAvailable
    };
}
export function toPaginatedCategoryResponse(paginatedData:IPaginatedData<ICategory>):IPaginatedData<ICategoryResponseDto> {
    
    return {
        total: paginatedData.total || 0,    
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        // We use our simple function inside the map
        data: (paginatedData.data || []).map(formatCategoryResponse)
    };
}