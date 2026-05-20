
import {  ICreateCategoryDto, IUpdateCategoryDto } from "../../../dtos/admin/category/category-create.dto";
import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";

export default interface ICategoryRepository{
    createCategory(data:ICreateCategoryDto,hotelId:string):Promise<ICategory>;
    getAllCategory(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<ICategory>> 
    getCategoryById(id:string):Promise<ICategory | null>;
    updateCategory(id:string,data:IUpdateCategoryDto):Promise<ICategory | null>;
    statusChangeCategory(id:string,status:string):Promise<ICategory | null>;
    deleteCategory(id:string):Promise<ICategory | null>;
    findByName(name:string,hotelId:string,excludeId?:string):Promise<ICategory|null>
}