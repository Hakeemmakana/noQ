
import { inject, injectable } from "inversify";
import { ICategory } from "../../../models/category";
import { PaginatedResult } from "../../../types/pagination";
import ICategoryService from "../interfaces/ICategoryService";
import { TYPES } from "../../../DI/types";
import ICategoryRepository from "../../../repositories/category/interfaces/ICategoryRepository";
import { AppError } from "../../../middleware/errorHandler";
import { CATEGORY_NAME_EXIST, CATEGORY_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import {  ICategoryResponseDto, toPaginatedCategoryResponse } from "../../../dtos/admin/category/category-response.dto";
import { createCategoryDto, getCategoryDto, ICategoryReqDto, IGetCategoryDto, IUpdateCategoryReqDto, updateCategoryDto } from "../../../dtos/admin/category/category-create.dto";
@injectable()
export default class CategoryService implements ICategoryService {
    constructor(@inject(TYPES.CategoryRepository) private _categoryRepository: ICategoryRepository) { }
    createCategory = async (data: ICategoryReqDto, hotelId: string): Promise<ICategory> => {
        const dto=createCategoryDto(data)
        if(dto.name){
            const existCategroy = await this._categoryRepository.findByName(data.name, hotelId)
            if (existCategroy) {
                throw new AppError(CATEGORY_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._categoryRepository.createCategory(dto, hotelId)
    }
    getAllCategory = async (data:IGetCategoryDto, hotelId: string): Promise<PaginatedResult<ICategoryResponseDto>> => {
        const dataFrom=getCategoryDto(data)
        const limit = 8
        const res=await this._categoryRepository.getAllCategory(dataFrom.searchVal , dataFrom.page, limit, hotelId)
        const outDto =toPaginatedCategoryResponse(res)
        return outDto

    }
    updateCategory = async (id: string, hotelId: string, data:IUpdateCategoryReqDto): Promise<ICategory | null> => {
            const dto = updateCategoryDto(data)
        if (dto.name) {
            const existCategoryName = await this._categoryRepository.findByName(dto.name, hotelId, id)
            if (existCategoryName) {
                throw new AppError(CATEGORY_NAME_EXIST, HttpStatus.CONFLICT)
            }
        }
        const categoryIsExist = await this._categoryRepository.getCategoryById(id)
        if (!categoryIsExist||categoryIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(CATEGORY_NOT_EXIST, HttpStatus.NOT_FOUND)
        }
        
        return await this._categoryRepository.updateCategory(id, dto)
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