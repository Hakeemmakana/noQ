
import { inject, injectable } from "inversify";
import HttpStatus from "../../../constants/httpStatusCode";
import { FILE_IS_REQURIED, PROFILE_UPDATE_SUCCESS, USER_NOT_FOUND, VALIDATION_FAILED } from "../../../constants/messages";
import { AppError } from "../../../middleware/errorHandler";
import { AuthRequest } from "../../../middleware/jwt";
import IHotelAdminController from "../interface/IHotelAdminController";
import { NextFunction, Response } from "express";
import { TYPES } from "../../../DI/types";
import IHotelAdminService from "../../../services/hotelAdmin/interface/IHotelAdminService";
import { adminResponseDto } from "../../../dtos/admin/hotelAdminDto/admin.response.dto";
import { adminProfileInputDto } from "../../../dtos/admin/hotelAdminDto/admin-input.dto";
import { validateAdminProfileForm } from "../../../validation/updateProfileAdminValidation";
@injectable()
export default class HotelAdminController implements IHotelAdminController{
    constructor(@inject(TYPES.HotelAdminService)private _HotelAdminService:IHotelAdminService){}
    getAdminProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
         try {
             const hotelId = req.admin?.id as string
             const user = await this._HotelAdminService.getProfile(hotelId)
             if (!user) {
                 throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
             }
             
             res.json({
                 message: 'success',
                 data: user
             })
         } catch (error) {
             next(error)
         }
     }
 updateAdminProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
         try {
             const hotelId = req.admin?.id as string
             
             const { isValid, errors } = validateAdminProfileForm(req.body)
             if (!isValid) {
                 throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, errors)
             }
             const user = await this._HotelAdminService.updateAdminProfile(hotelId, req.body)
             if (!user) {
                 throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
             }
             const mappedUser = adminResponseDto(user)
             res.json({
                 message: 'User details updated successfully',
                 data: mappedUser
             })
         } catch (error) {
             next(error)
         }
     }
     
     updateAdminProfilePicture = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
         try {
            
             const hotelId = req.admin?.id as string
             if (!req.file) {
                 throw new AppError(FILE_IS_REQURIED, HttpStatus.BAD_REQUEST)
             }
             const updatedUser = await this._HotelAdminService.updateAdminProfilePicture(hotelId, req.file)
             if (!updatedUser) {
                 throw new AppError(USER_NOT_FOUND,HttpStatus.NOT_FOUND)
             }
             res.status(HttpStatus.OK).json({
                 success:true,
                 message:PROFILE_UPDATE_SUCCESS,
                 imageUrl:updatedUser.imageUrl
             })
 
         } catch (error) {
            next(error)
         }
     }
}