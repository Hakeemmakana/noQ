import { NextFunction, Response } from "express";
import { IStaffController } from "../interfaces/IStaffController";
import { AuthRequest } from "../../../middleware/jwt";
import { inject, injectable } from "inversify";
import IStaffService from "../../../services/staff/interfaces/IStaffService";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { INVALID_STATUS, STAFF_CREATE_SUCCESS, STAFF_DELETE_SUCCESS, STAFF_FETCH_SUCCESS, STAFF_ID_REQUIRED, STAFF_NOT_FOUND, STAFF_STATUS_CHANGE_SUCCESS, STAFF_UPDATE_SUCCESS, VALIDATION_FAILED } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { IGetStaffDto } from "../../../dtos/admin/staff/staff-create.dto";
import { validateStaffForm } from "../../../validation/staffValidation";
import { apiResponse } from "../../../utils/apiResponse";
@injectable()
export default class StaffController implements IStaffController {
    constructor(@inject(TYPES.StaffService) private _StaffService: IStaffService) {}

    getAllStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const query=req.query as unknown as IGetStaffDto
            const data = await this._StaffService.getAllStaff(query, hotelId)
            apiResponse(res, HttpStatus.OK, STAFF_FETCH_SUCCESS,data)
            return
        } catch (error) {
            next(error);
        }
    };

    createStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const validate = validateStaffForm(req.body)
            if (!validate.isValid) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors)
            }
            await this._StaffService.createStaff(req.body, hotelId)
            apiResponse(res, HttpStatus.CREATED, STAFF_CREATE_SUCCESS)
            return
        } catch (error) {
            next(error);
        }
    };

    statusChangeStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {

            const id = req.params.id as string
            const status = req.body.status
            const hotelId = req.admin?.id as string
            if (!id) {
                throw new AppError(STAFF_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }
            if (status !== "active" && status !== "inactive") {
                throw new AppError(INVALID_STATUS, HttpStatus.BAD_REQUEST)
            }
            const result = await this._StaffService.statusChangeStaff(id, hotelId, status);
            
            if (!result) {
                throw new AppError(STAFF_NOT_FOUND, HttpStatus.NOT_FOUND)
            }

            apiResponse(res, HttpStatus.OK, STAFF_STATUS_CHANGE_SUCCESS)
            return
        } catch (error) {
            next(error);
        }
    };

    updateStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const hotelId = req.admin?.id as string
            const validate = validateStaffForm(req.body)
            if (!validate.isValid || !id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, validate.errors)
            }
            const result = await this._StaffService.updateStaff(id, hotelId, req.body);
            
            if (!result) {
                throw new AppError(STAFF_NOT_FOUND, HttpStatus.NOT_FOUND, validate.errors)
            }

            apiResponse(res, HttpStatus.OK, STAFF_UPDATE_SUCCESS)
            return
        } catch (error) {
            next(error);
        }
    };

    deleteStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string
            const hotelId = req.admin?.id as string

            if (!id) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST)
            }
            const result = await this._StaffService.deleteStaff(id, hotelId);
            
            if (!result) {
                throw new AppError(STAFF_NOT_FOUND, HttpStatus.NOT_FOUND)
            }

            apiResponse(res, HttpStatus.OK, STAFF_DELETE_SUCCESS)
            return

        } catch (error) {
            next(error);
        }
    };
}