import { ICategoryReqDto, IGetCategoryDto, IUpdateCategoryReqDto } from "../../../dtos/admin/category/category-create.dto";
import {  ICategoryResponseDto } from "../../../dtos/admin/category/category-response.dto";
import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";

export default interface ICategoryService {
    getAllCategory(data:IGetCategoryDto, hotelId: string): Promise<PaginatedResult<ICategoryResponseDto>>;
    createCategory(data: ICategoryReqDto, hotelId: string): Promise<ICategory>;
    statusChangeCategory(id: string, hotelId: string, status: "active" | "inactive"): Promise<ICategory | null>;
    updateCategory(id: string, hotelId: string, data: IUpdateCategoryReqDto): Promise<ICategory | null>;
    deleteCategory(id: string, hotelId: string): Promise<ICategory | null>;
}