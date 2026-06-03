import { NextFunction, Request, Response } from "express";
import { ITableController } from "../interfaces/ITableController";
import HttpStatus from "../../../constants/httpStatusCode";
import { INVALID_STATUS, TABLE_CREATE_SUCCESS, TABLE_DELETE_SUCCESS, TABLE_FETCH_SUCCESS, TABLE_ID_REQUIRED, TABLE_NOT_FOUND, TABLE_STATUS_CHANGE_SUCCESS, TABLE_UPDATE_SUCCESS, VALIDATION_FAILED } from "../../../constants/messages";
import ITableService from "../../../services/table/interfaces/ITableService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { AuthRequest } from "../../../middleware/jwt";
import {  getOneTable, IGetTableDto } from "../../../dtos/admin/table/table-create.dto";
import { validateTableForm } from "../../../validation/tableValidation";
@injectable()
export default class TableController implements ITableController {
    constructor(@inject(TYPES.TableService) private _TableService: ITableService) { }

    getAllTable = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const data = await this._TableService.getAllTable(req.query as unknown as IGetTableDto, hotelId)

            
            res.status(HttpStatus.OK).json({
                message: TABLE_FETCH_SUCCESS,
                data: data
            })
            return

        } catch (error) {
            next(error);
        }
    };

    createTable = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const validate = validateTableForm(req.body)
            if (!validate.isValid) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors)
            }
            await this._TableService.createTable(req.body, hotelId)

            res.status(HttpStatus.CREATED).json({ message: TABLE_CREATE_SUCCESS });
            return
        } catch (error) {
            next(error);
        }
    };

    statusChangeTable = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const status = req.body.status
            const hotelId = req.admin?.id as string
            if (!id) {
                res.status(400).json({
                    message: TABLE_ID_REQUIRED,
                });
                return
            }
            if (status !== "active" && status !== "inactive") {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: INVALID_STATUS,
                });
                return
            }
            const result = await this._TableService.statusChangeTable(id, hotelId, status);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: TABLE_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: TABLE_STATUS_CHANGE_SUCCESS,
                data: result,
            });
            return
        } catch (error) {
            next(error);
        }
    };

    updateTable = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {

            const id = req.params.id as string
            const hotelId = req.admin?.id as string
            const validate = validateTableForm(req.body)
            if (!validate.isValid || !id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors)
            }
            if (!['active', 'inactive'].includes(req.body.status)) {
                throw new AppError(INVALID_STATUS, HttpStatus.BAD_REQUEST)
            }
            const result = await this._TableService.updateTable(id, hotelId, req.body);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: TABLE_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: TABLE_UPDATE_SUCCESS,
                data: result,
            });
            return
        } catch (error) {
            next(error);
        }
    };

    deleteTable = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const hotelId = req.admin?.id as string

            if (!id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST)
            }
            const result = await this._TableService.deleteTable(id, hotelId);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: TABLE_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: TABLE_DELETE_SUCCESS,
                data: result,
            });
            return
        } catch (error) {
            next(error);
        }
    };
    getTable=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const { hotelId , tableId } = req.params;
            if(!hotelId||!tableId){
                throw new AppError(VALIDATION_FAILED,HttpStatus.BAD_REQUEST)
            }
            const result = await this._TableService.getTable(req.params as unknown as getOneTable);
            if(!result){
                throw new AppError(TABLE_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
            res.status(HttpStatus.OK).json({
                success: true,
                ...result
            }); 
            
        } catch (error) {
            next(error)
        }
    }
}