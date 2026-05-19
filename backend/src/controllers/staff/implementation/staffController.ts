import { NextFunction, Response } from "express";
import { IStaffController } from "../interfaces/IStaffController";
import { AuthRequest } from "../../../middleware/jwt";
import { inject, injectable } from "inversify";
import IStaffService from "../../../services/staff/interfaces/IStaffService";
import { TYPES } from "../../../DI/types";
import { AppError } from "../../../middleware/errorHandler";
import { INVALID_STATUS, STAFF_CREATE_SUCCESS, STAFF_DELETE_SUCCESS, STAFF_FETCH_SUCCESS, STAFF_ID_REQUIRED, STAFF_NOT_FOUND, STAFF_STATUS_CHANGE_SUCCESS, STAFF_UPDATE_SUCCESS, VALIDATION_FAILED } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { createStaffDto, getStaffDto, IGetStaffDto } from "../../../dtos/admin/staff/staff-create.dto";
import { validateStaffForm } from "../../../validation/staffValidation";
import { toPaginatedStaffResponse } from "../../../dtos/admin/staff/staff.response.dto";
@injectable()
export default class StaffController implements IStaffController {
    constructor(@inject(TYPES.StaffService) private _StaffService: IStaffService) {}

    getAllStaff = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id as string
            const query=req.query as unknown as IGetStaffDto
            const data = await this._StaffService.getAllStaff(query, hotelId)
            res.status(HttpStatus.OK).json({
                message: STAFF_FETCH_SUCCESS,
                data:data
            })
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

            res.status(HttpStatus.CREATED).json({ message: STAFF_CREATE_SUCCESS });
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
                res.status(400).json({
                    message: STAFF_ID_REQUIRED,
                });
                return
            }
            if (status !== "active" && status !== "inactive") {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: INVALID_STATUS,
                });
                return
            }
            const result = await this._StaffService.statusChangeStaff(id, hotelId, status);

            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    message: STAFF_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: STAFF_STATUS_CHANGE_SUCCESS,
                data: result,
            });
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
                res.status(HttpStatus.NOT_FOUND).json({
                    message: STAFF_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: STAFF_UPDATE_SUCCESS,
                data: result,
            });
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
                res.status(HttpStatus.NOT_FOUND).json({
                    message: STAFF_NOT_FOUND,
                });
                return
            }


            res.status(HttpStatus.OK).json({
                message: STAFF_DELETE_SUCCESS,
                data: result,
            });
            return

        } catch (error) {
            next(error);
        }
    };
}