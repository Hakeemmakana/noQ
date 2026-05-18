import { inject, injectable } from "inversify";
import HttpStatus from "../../../constants/httpStatusCode";
import {  ACCOUNT_IS_BLOCKED, ACCOUNT_IS_PENDING, ACCOUNT_IS_REJECTED, INVALID_CREDENTIALS, INVALID_TOKEN, NO_REFRESH_TOKEN_FOUND, PASSWORD_NOT_SET, RESTAURANT_NOT_FOUND, USER_NOT_FOUND } from "../../../constants/messages";
import { AppError } from "../../../middleware/errorHandler";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../middleware/jwt";
import IAdminAuthRepository from "../../../repositories/adminAuth/interface/IAdminAuthRepository";
import IAdminAuthService  from "../interface/IAdminAuthService";
import bcrypt from 'bcrypt'
import { TYPES } from "../../../DI/types";
import { adminResponseDto, IAdminResponseDto } from "../../../dtos/admin/hotelAdminDto/admin.response.dto";
@injectable()
export default class AdminAuthService implements IAdminAuthService{
    constructor(@inject(TYPES.AdminAuthRepository) private _adminAuthRepository:IAdminAuthRepository){}

    login = async (email: string, password: string): Promise<{ user: IAdminResponseDto; accessToken: string; refreshToken: string }> => {
        const restaurant = await this._adminAuthRepository.findByEmail(email)
        if (!restaurant) {
            throw new AppError(RESTAURANT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (restaurant.status=='rejected') {
            throw new AppError(ACCOUNT_IS_REJECTED, HttpStatus.FORBIDDEN);
        }
        if (restaurant.status=='pending') {
            throw new AppError(ACCOUNT_IS_PENDING, HttpStatus.FORBIDDEN);
        }
        if (!restaurant.password) {
            throw new AppError(PASSWORD_NOT_SET, HttpStatus.BAD_REQUEST)
        }
        const isMatch = await bcrypt.compare(password, restaurant.password)
        if (!isMatch) {
            throw new AppError(INVALID_CREDENTIALS, HttpStatus.FORBIDDEN)
        }
        
        

        const role = 'admin'
        const accessToken = generateAccessToken(restaurant._id.toString(), role)
        const refreshToken = generateRefreshToken(restaurant._id.toString(), role)
        const afterDtoAdmin = adminResponseDto(restaurant)
        return { user: afterDtoAdmin, accessToken, refreshToken }
    }
    refreshToken=async(refreshToken: string):Promise<{ newAccessToken: string }>=> {
    if (!refreshToken)
      throw new AppError( NO_REFRESH_TOKEN_FOUND,HttpStatus.BAD_REQUEST);

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new AppError( INVALID_TOKEN,HttpStatus.FORBIDDEN);
    }

    const admin = await this._adminAuthRepository.findById(decoded.id);
    if (!admin) {
      throw new AppError( USER_NOT_FOUND,HttpStatus.NOT_FOUND);
    }

    if (admin.status=='rejected') {
      throw new AppError( ACCOUNT_IS_BLOCKED,HttpStatus.FORBIDDEN,);
    }
    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    return { newAccessToken };
  }
}