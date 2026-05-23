import { NextFunction, Request, Response } from "express";
import HttpStatus from "../../../constants/httpStatusCode";
import { 
    INVALID_STATUS, 
    MENU_ITEM_CREATE_SUCCESS, 
    MENU_ITEM_DELETE_SUCCESS, 
    MENU_ITEM_FETCH_SUCCESS, 
    MENU_ITEM_ID_REQUIRED, 
    MENU_ITEM_NOT_FOUND, 
    MENU_ITEM_STATUS_CHANGE_SUCCESS, 
    MENU_ITEM_UPDATE_SUCCESS, 
    VALIDATION_FAILED 
} from "../../../constants/messages";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { AuthRequest } from "../../../middleware/jwt";

import { IMenuItemController } from "../interface/IMenuController";
import { validateMenuItemForm } from "../../../validation/menuValidation";
import IMenuItemService from "../../../services/menu/interface/IMenuService";
import { IGetMenuItemDto } from "../../../dtos/menuItems/menu-req-dto";

@injectable()
export default class MenuItemController implements IMenuItemController {
    constructor(
        @inject(TYPES.MenuItemService) private _MenuItemService: IMenuItemService
    ) { }

    getAllMenuItems = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string;
            const data = await this._MenuItemService.getAllMenuItems(req.query as unknown as IGetMenuItemDto, hotelId);

            res.status(HttpStatus.OK).json({
                message: MENU_ITEM_FETCH_SUCCESS,
                data: data
            });
            return;
        } catch (error) {
            next(error);
        }
    };

    createMenuItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string;
            const menuImage=req.file
            console.log(req.body)
            const validate = validateMenuItemForm(req.body);
            if (!validate.isValid) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors);
            }
            await this._MenuItemService.createMenuItem(req.body, hotelId,req.file!);

            res.status(HttpStatus.CREATED).json({ message: MENU_ITEM_CREATE_SUCCESS });
            return;
        } catch (error) {
            next(error);
        }
    };

    statusChangeMenuItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const status = req.body.status; // 'available' അല്ലെങ്കിൽ 'out_of_stock'
            const hotelId = req.admin?.id as string;

            if (!id) {
                res.status(400).json({
                    message: MENU_ITEM_ID_REQUIRED,
                });
                return;
            }
            
            if (status !== "available" && status !== "out_of_stock") {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: INVALID_STATUS,
                });
                return;
            }
            
            const result = await this._MenuItemService.statusChangeMenuItem(id, hotelId, status);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: MENU_ITEM_NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                message: MENU_ITEM_STATUS_CHANGE_SUCCESS,
                data: result,
            });
            return;
        } catch (error) {
            next(error);
        }
    };

    updateMenuItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const hotelId = req.admin?.id as string;
            const validate = validateMenuItemForm(req.body);

            if (!validate.isValid || !id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors);
            }
            
            if (!['available', 'unavailable'].includes(req.body.status)) {
                throw new AppError(INVALID_STATUS, HttpStatus.BAD_REQUEST);
            }
            
            const result = await this._MenuItemService.updateMenuItem(id, hotelId, req.body,req.file);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: MENU_ITEM_NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                message: MENU_ITEM_UPDATE_SUCCESS,
                data: result,
            });
            return;
        } catch (error) {
            next(error);
        }
    };

    deleteMenuItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const hotelId = req.admin?.id as string;

            if (!id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST);
            }
            const result = await this._MenuItemService.deleteMenuItem(id, hotelId);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: MENU_ITEM_NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                message: MENU_ITEM_DELETE_SUCCESS,
                data: result,
            });
            return;
        } catch (error) {
            next(error);
        }
    };

    // getMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { hotelId, menuItemId } = req.params;
    //         if (!hotelId || !menuItemId) {
    //             throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST);
    //         }
            
    //         const result = await this._MenuItemService.getMenuItem(req.params as unknown as getOneMenuItem);
    //         if (!result) {
    //             throw new AppError(MENU_ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    //         }
            
    //         res.status(HttpStatus.OK).json({
    //             success: true,
    //             ...result
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };
}