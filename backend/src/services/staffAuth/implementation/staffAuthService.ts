import { inject, injectable } from "inversify";
import HttpStatus from "../../../constants/httpStatusCode";
import { INVALID_CREDENTIALS, INVALID_TOKEN, NO_REFRESH_TOKEN_FOUND, STAFF_NOT_FOUND } from "../../../constants/messages";
import { IStaffAuthResponseDto, staffAuthResponseDto } from "../../../dtos/staffAuth/IStaffResponse.dto";
import { AppError } from "../../../middleware/errorHandler";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../middleware/jwt";
import IStaffAuthService from "../interface/IStaffAuthService";
import { TYPES } from "../../../DI/types";
import IStaffAuthRepository from "../../../repositories/staffAuth/interface/IStaffAuthRepository";
@injectable()
export default class StaffAuthService implements IStaffAuthService {
    constructor(@inject(TYPES.StaffAuthRepository) private _staffAuthRepository:IStaffAuthRepository){}
    login = async (email: string, password: string): Promise<{ staff: IStaffAuthResponseDto; accessToken: string; refreshToken: string }> => {
        const staff = await this._staffAuthRepository.findByEmail(email)
        if (!staff||!staff.isActive) {
            throw new AppError(STAFF_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
       
        // const isMatch = await bcrypt.compare(password, staff.password)
        
        if (password!==staff.password) {
            throw new AppError(INVALID_CREDENTIALS, HttpStatus.FORBIDDEN)
        }



        const role = 'staff'
        const accessToken = generateAccessToken(staff?._id!.toString(), role)
        const refreshToken = generateRefreshToken(staff?._id!.toString(), role)
        const afterDtoStaff = staffAuthResponseDto(staff)
        return { staff: afterDtoStaff, accessToken, refreshToken }
    }
    refreshToken = async (refreshToken: string): Promise<{ newAccessToken: string }> => {
        if (!refreshToken)
            throw new AppError(NO_REFRESH_TOKEN_FOUND, HttpStatus.BAD_REQUEST);

        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            throw new AppError(INVALID_TOKEN, HttpStatus.FORBIDDEN);
        }

        const staff = await this._staffAuthRepository.findById(decoded.id);
        if (!staff) {
            throw new AppError(STAFF_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        if (!staff.isActive) {
            throw new AppError(STAFF_NOT_FOUND, HttpStatus.FORBIDDEN,);
        }
        const newAccessToken = generateAccessToken(decoded.id, decoded.role);

        return { newAccessToken };
    }
}