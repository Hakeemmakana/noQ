import { inject, injectable } from "inversify";
import { IStaff } from "../../../models/staff";
import { PaginatedResult } from "../../../types/pagination";
import IStaffService from "../interfaces/IStaffService";
import { TYPES } from "../../../DI/types";
import { IStaffRepository } from "../../../repositories/staff/interfaces/IStaffRepository";
import { AppError } from "../../../middleware/errorHandler";
import { STAFF_EMAIL_EXIST, STAFF_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
@injectable()
export default class StaffService implements IStaffService {
    constructor(@inject(TYPES.StaffRepository) private _staffRepository:IStaffRepository) { }

    createStaff = async (data: Partial<IStaff>, hotelId: string): Promise<IStaff> => {
        if (data.email) {
            const existStaff = await this._staffRepository.findByEmail(data.email, hotelId)
            if (existStaff) {
                throw new AppError(STAFF_EMAIL_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._staffRepository.createStaff(data, hotelId)
    }
    getAllStaff = async (searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<IStaff>> => {
        const limit = 8
        return await this._staffRepository.getAllStaff(searchVal, page, limit, hotelId)
    }
    updateStaff = async (id: string, hotelId: string, data: Partial<IStaff>): Promise<IStaff | null> => {
        if (data.email) {

            const existStaffEmail = await this._staffRepository.findByEmail(data.email, hotelId, id)
            if (existStaffEmail) {
                throw new AppError(STAFF_EMAIL_EXIST, HttpStatus.CONFLICT)
            }
        }
        const staffIsExist = await this._staffRepository.getStaffById(id)
        if (!staffIsExist || staffIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(STAFF_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._staffRepository.updateStaff(id, data)
    }
    statusChangeStaff = async (id: string, hotelId: string, status: "active" | "inactive"): Promise<IStaff | null> => {
        const staffIsExist = await this._staffRepository.getStaffById(id)
        if (!staffIsExist || staffIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(STAFF_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._staffRepository.statusChangeStaff(id, status)
    }
    deleteStaff = async (id: string, hotelId: string): Promise<IStaff | null> => {
        const staffIsExist = await this._staffRepository.getStaffById(id)
        if (!staffIsExist || staffIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(STAFF_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._staffRepository.deleteStaff(id)
    }
}