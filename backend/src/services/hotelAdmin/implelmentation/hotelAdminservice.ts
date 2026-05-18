import { inject, injectable } from "inversify"
import IHotelAdminService from "../interface/IHotelAdminService"
import { IHotelAdmin } from "../../../models/hotelAdmin"
import { TYPES } from "../../../DI/types"
import IHotelAdminRepository from "../../../repositories/hotelAdmin/interface/IHotelAdminRepository"
import IMediaService from "../../mediaService/interface/IMediaService"
import { AppError } from "../../../middleware/errorHandler"
import { UPLOAD_PORFILE_FAILED } from "../../../constants/messages"
import HttpStatus from "../../../constants/httpStatusCode"
@injectable()
export default class HotelAdminService implements IHotelAdminService {
    constructor(@inject(TYPES.HotelAdminRepository)private _HotelAdminRepository:IHotelAdminRepository,
                @inject(TYPES.MediaService)private _MediaService:IMediaService){}
                
    getProfile = async (hotelId: string): Promise<IHotelAdmin | null> => {
        return await this._HotelAdminRepository.getProfile(hotelId)
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
    updateAdminProfile = async (hotelId: string, data: Partial<IHotelAdmin>): Promise<IHotelAdmin | null> => {
        return await this._HotelAdminRepository.updateAdminProfile(hotelId, data)
    }
}