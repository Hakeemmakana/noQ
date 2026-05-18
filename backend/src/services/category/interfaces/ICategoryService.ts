import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";

export default interface ICategoryService {
    getAllCategory(searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<ICategory>>;
    createCategory(data: Partial<ICategory>, hotelId: string): Promise<ICategory>;
    statusChangeCategory(id: string, hotelId: string, status: "active" | "inactive"): Promise<ICategory | null>;
    updateCategory(id: string, hotelId: string, data: Partial<ICategory>): Promise<ICategory | null>;
    deleteCategory(id: string, hotelId: string): Promise<ICategory | null>;
}