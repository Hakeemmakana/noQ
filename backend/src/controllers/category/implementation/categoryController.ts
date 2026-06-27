import {  Response, NextFunction } from "express";
import { ICategoryController } from "../interfaces/ICatetoryController";
import { validateCategoryForm } from "../../../validation/categoryValidation";
import { AppError } from "../../../middleware/errorHandler";
import HttpStatus from "../../../constants/httpStatusCode";
import { IGetCategoryDto } from "../../../dtos/admin/category/category-create.dto";
import { CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_FETCH_SUCCESS, CATEGORY_ID_REQUIRED, CATEGORY_NOT_FOUND, CATEGORY_STATUS_CHANGE_SUCCESS, CATEGORY_UPDATE_SUCCESS, INVALID_STATUS, VALIDATION_FAILED } from "../../../constants/messages";
import { AuthRequest } from "../../../middleware/jwt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import ICategoryService from "../../../services/category/interfaces/ICategoryService";
import { apiResponse } from "../../../utils/apiResponse";
@injectable()
export default class CategoryController implements ICategoryController {
    constructor(@inject(TYPES.CategoryService) private _CategoryService: ICategoryService) { }
    getAllCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data= req.query
            const hotelId = req.admin?.id as string
            const resData = await this._CategoryService.getAllCategory(data as unknown as IGetCategoryDto, hotelId)
            apiResponse(res, HttpStatus.OK,CATEGORY_FETCH_SUCCESS,resData)
            return
        } catch (error) {
            next(error);
        }
    };

    createCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const validatedData = validateCategoryForm(req.body)
            if (!validatedData.isValid) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validatedData.errors)
            }
            await this._CategoryService.createCategory(req.body, hotelId)
            apiResponse(res, HttpStatus.CREATED,CATEGORY_CREATE_SUCCESS)
            return
        } catch (error) {
            next(error);
        }
    };

    statusChangeCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const id = req.params.id as string
            const status = req.body.status
            const hotelId = req.admin?.id as string
            if (!id) {
                throw new AppError(CATEGORY_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }
            if (status !== "active" && status !== "inactive") {
                throw new AppError(INVALID_STATUS, HttpStatus.BAD_REQUEST)
            }
            const result = await this._CategoryService.statusChangeCategory(id, hotelId, status);
            
            if (!result) {
                throw new AppError(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
            }

            apiResponse(res, HttpStatus.OK,CATEGORY_STATUS_CHANGE_SUCCESS,result)
            return
        } catch (error) {
            next(error);
        }
    };

    updateCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const hotelId = req.admin?.id as string
            const validate = validateCategoryForm(req.body)
            if (!validate.isValid || !id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors)
            }
            const result = await this._CategoryService.updateCategory(id, hotelId, req.body);
            
            if (!result) {
                throw new AppError(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
            }

            apiResponse(res, HttpStatus.OK,CATEGORY_UPDATE_SUCCESS,result)
            return

        } catch (error) {
            next(error);
        }
    };

    deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const hotelId = req.admin?.id as string

            if (!id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST)
            }
            const result = await this._CategoryService.deleteCategory(id, hotelId);
            
            if (!result) {
                throw new AppError(CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
            }

            apiResponse(res, HttpStatus.OK,CATEGORY_DELETE_SUCCESS,result)
            return

        } catch (error) {
            next(error);
        }
    };
    getAllCategoryForUser=async(req:AuthRequest , res: Response, next: NextFunction): Promise<void> =>{
        try {
            const hotelId=req.hotelId
            const resData=await this._CategoryService.getAllCategoryForUser(hotelId!)
            apiResponse(res, HttpStatus.OK,CATEGORY_FETCH_SUCCESS,resData)
        } catch (error) {
            next(error)
        }
    }
}