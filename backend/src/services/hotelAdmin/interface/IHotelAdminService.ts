import { IAdminProfileInputDto } from "../../../dtos/admin/hotelAdminDto/admin-input.dto"
import { IAdminResponseDto } from "../../../dtos/admin/hotelAdminDto/admin.response.dto"
import { IHotelAdmin } from "../../../models/hotelAdmin"

export default interface IHotelAdminService {
    updateAdminProfile(hotelId: string, data: IAdminProfileInputDto): Promise<IHotelAdmin | null>
    getProfile(hotelId: string): Promise<IAdminResponseDto>
    updateAdminProfilePicture(hotelId: string, file: Express.Multer.File): Promise<IHotelAdmin | null>
}