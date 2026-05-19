import {  Response, NextFunction } from "express";
import { ICategoryController } from "../interfaces/ICatetoryController";
import { validateCategoryForm } from "../../../validation/categoryValidation";
import { AppError } from "../../../middleware/errorHandler";
import HttpStatus from "../../../constants/httpStatusCode";
import { createCategoryDto, getCategoryDto, IGetCategoryDto } from "../../../dtos/admin/category/category-create.dto";
import { CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_FETCH_SUCCESS, CATEGORY_ID_REQUIRED, CATEGORY_NOT_FOUND, CATEGORY_STATUS_CHANGE_SUCCESS, CATEGORY_UPDATE_SUCCESS, INVALID_STATUS, VALIDATION_FAILED } from "../../../constants/messages";
import { AuthRequest } from "../../../middleware/jwt";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import ICategoryService from "../../../services/category/interfaces/ICategoryService";
import {  toPaginatedCategoryResponse } from "../../../dtos/admin/category/category-response.dto";
@injectable()
export default class CategoryController implements ICategoryController {
    constructor(@inject(TYPES.CategoryService) private _CategoryService: ICategoryService) { }
    getAllCategory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data= req.query
            const hotelId = req.admin?.id as string
            const resData = await this._CategoryService.getAllCategory(data as unknown as IGetCategoryDto, hotelId)
            res.status(HttpStatus.OK).json({
                message: CATEGORY_FETCH_SUCCESS,
                data: resData
            })
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

            res.status(HttpStatus.CREATED).json({ message: CATEGORY_CREATE_SUCCESS });
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
                res.status(400).json({
                    message: CATEGORY_ID_REQUIRED,
                });
                return
            }
            if (status !== "active" && status !== "inactive") {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: INVALID_STATUS,
                });
                return
            }
            const result = await this._CategoryService.statusChangeCategory(id, hotelId, status);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: CATEGORY_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: CATEGORY_STATUS_CHANGE_SUCCESS,
                data: result,
            });
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
                res.status(HttpStatus.NOT_FOUND).json({
                    message: CATEGORY_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: CATEGORY_UPDATE_SUCCESS,
                data: result,
            });
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
                res.status(HttpStatus.NOT_FOUND).json({
                    message: CATEGORY_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: CATEGORY_DELETE_SUCCESS,
                data: result,
            });
            return

        } catch (error) {
            next(error);
        }
    };
}