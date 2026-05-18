
import { inject, injectable } from "inversify";
import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";
import ICategoryService from "../interfaces/ICategoryService";
import { TYPES } from "../../../DI/types";
import ICategoryRepository from "../../../repositories/category/interfaces/ICategoryRepository";
import { AppError } from "../../../middleware/errorHandler";
import { CATEGORY_NAME_EXIST, CATEGORY_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
@injectable()
export default class CategoryService implements ICategoryService {
    constructor(@inject(TYPES.CategoryRepository) private _categoryRepository: ICategoryRepository) { }
    createCategory = async (data: Partial<ICategory>, hotelId: string): Promise<ICategory> => {
        if(data.name){
            const existCategroy = await this._categoryRepository.findByName(data.name, hotelId)
            if (existCategroy) {
                throw new AppError(CATEGORY_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._categoryRepository.createCategory(data, hotelId)
    }
    getAllCategory = async (searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<ICategory>> => {
        const limit = 8
        return await this._categoryRepository.getAllCategory(searchVal, page, limit, hotelId)

    }
    updateCategory = async (id: string, hotelId: string, data: Partial<ICategory>): Promise<ICategory | null> => {
        if (data.name) {

            const existCategoryName = await this._categoryRepository.findByName(data.name, hotelId, id)
            if (existCategoryName) {
                throw new AppError(CATEGORY_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        const categoryIsExist = await this._categoryRepository.getCategoryById(id)
        if (!categoryIsExist||categoryIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(CATEGORY_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        
        return await this._categoryRepository.updateCategory(id, data)
    }
    statusChangeCategory = async (id: string, hotelId: string, status: "active" | "inactive"): Promise<ICategory | null> => {
        const categoryIsExist = await this._categoryRepository.getCategoryById(id)
        if (!categoryIsExist||categoryIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(CATEGORY_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        
        return await this._categoryRepository.statusChangeCategory(id, status)
    }
    deleteCategory = async (id: string, hotelId: string): Promise<ICategory | null> => {
        const categoryIsExist = await this._categoryRepository.getCategoryById(id)
        if (!categoryIsExist||categoryIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(CATEGORY_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        
        return await this._categoryRepository.deleteCategory(id)
    }

}