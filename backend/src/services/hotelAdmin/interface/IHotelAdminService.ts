import { IHotelAdmin } from "../../../models/hotelAdmin"

export default interface IHotelAdminService {
    updateAdminProfile(hotelId: string, data: Partial<IHotelAdmin>): Promise<IHotelAdmin | null>
    getProfile(hotelId: string): Promise<IHotelAdmin | null>
    updateAdminProfilePicture(hotelId: string, file: Express.Multer.File): Promise<IHotelAdmin | null>
}