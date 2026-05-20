import { inject, injectable } from "inversify"
import IHotelAdminService from "../interface/IHotelAdminService"
import { IHotelAdmin } from "../../../models/hotelAdmin"
import { TYPES } from "../../../DI/types"
import IHotelAdminRepository from "../../../repositories/hotelAdmin/interface/IHotelAdminRepository"
import IMediaService from "../../mediaService/interface/IMediaService"
import { AppError } from "../../../middleware/errorHandler"
import { ADMIN_NOT_FOUND, UPLOAD_PORFILE_FAILED } from "../../../constants/messages"
import HttpStatus from "../../../constants/httpStatusCode"
import { adminResponseDto, IAdminResponseDto } from "../../../dtos/admin/hotelAdminDto/admin.response.dto"
import { adminProfileInputDto, IAdminProfileInputDto } from "../../../dtos/admin/hotelAdminDto/admin-input.dto"
@injectable()
export default class HotelAdminService implements IHotelAdminService {
    constructor(@inject(TYPES.HotelAdminRepository)private _HotelAdminRepository:IHotelAdminRepository,
                @inject(TYPES.MediaService)private _MediaService:IMediaService){}
                
    getProfile = async (hotelId: string): Promise<IAdminResponseDto> => {

        const res=await this._HotelAdminRepository.getProfile(hotelId)
        if(!res){
            throw new AppError(ADMIN_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const mappedAdmin = adminResponseDto(res)
        return mappedAdmin
    }
    updateAdminProfilePicture = async (hotelId: string, file: Express.Multer.File): Promise<IHotelAdmin | null> => {
        let imageUrl: string | undefined
        if (file) {
            imageUrl = await this._MediaService.upload(file)
        }
        if (!imageUrl) {
            throw new AppError(UPLOAD_PORFILE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const updateUser = await this._HotelAdminRepository.updateAdminProfile(hotelId, { imageUrl })
        return updateUser
    }
    updateAdminProfile = async (hotelId: string, data:IAdminProfileInputDto ): Promise<IHotelAdmin | null> => {
        const dto = adminProfileInputDto(data)
        return await this._HotelAdminRepository.updateAdminProfile(hotelId, dto)
    }
}