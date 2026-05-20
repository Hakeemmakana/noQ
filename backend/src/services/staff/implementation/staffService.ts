import { inject, injectable } from "inversify";
import { IStaff } from "../../../models/staff";
import { PaginatedResult } from "../../../types/pagination";
import IStaffService from "../interfaces/IStaffService";
import { TYPES } from "../../../DI/types";
import { IStaffRepository } from "../../../repositories/staff/interfaces/IStaffRepository";
import { AppError } from "../../../middleware/errorHandler";
import { STAFF_EMAIL_EXIST, STAFF_NOT_EXIST } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { createStaffDto, getStaffDto, ICreateReqStaff, IGetStaffDto } from "../../../dtos/admin/staff/staff-create.dto";
import { IPaginatedDataStaff, IStaffResponseDto, toPaginatedStaffResponse } from "../../../dtos/admin/staff/staff.response.dto";
@injectable()
export default class StaffService implements IStaffService {
    constructor(@inject(TYPES.StaffRepository) private _staffRepository:IStaffRepository) { }

    createStaff = async (data: ICreateReqStaff, hotelId: string): Promise<IStaff> => {
        const dto=createStaffDto(data)
        if (dto.email) {
            const existStaff = await this._staffRepository.findByEmail(data.email, hotelId)
            if (existStaff) {
                throw new AppError(STAFF_EMAIL_EXIST, HttpStatus.CONFLICT)
            }
        }
        return await this._staffRepository.createStaff(dto, hotelId)
    }
    getAllStaff = async (data:IGetStaffDto, hotelId: string): Promise<IPaginatedDataStaff<IStaffResponseDto>> => {
        const dto=getStaffDto(data)
        const limit = 8
        const res= await this._staffRepository.getAllStaff(dto.searchVal, dto.page, limit, hotelId)
        const outDto=toPaginatedStaffResponse(res)
        return outDto
    }
    updateStaff = async (id: string, hotelId: string, data: ICreateReqStaff): Promise<IStaff | null> => {
        const dto=createStaffDto(data)
        if (dto.email) {

            const existStaffEmail = await this._staffRepository.findByEmail(dto.email, hotelId, id)
            if (existStaffEmail) {
                throw new AppError(STAFF_EMAIL_EXIST, HttpStatus.CONFLICT)
            }
        }
        const staffIsExist = await this._staffRepository.getStaffById(id)
        if (!staffIsExist || staffIsExist.hotelId.toString() !== hotelId) {
            throw new AppError(STAFF_NOT_EXIST, HttpStatus.NOT_FOUND)
        }

        return await this._staffRepository.updateStaff(id, dto)
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