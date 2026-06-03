import { IHotelAdmin } from "../../../models/hotelAdmin"

export default interface IHotelAdminRepository {
    updateAdminProfile(hotelId: string, data: Partial<IHotelAdmin>): Promise<IHotelAdmin | null>
    getProfile(hotelId: string): Promise<IHotelAdmin | null>
    getHotelBySlug(slug:string):Promise<IHotelAdmin|null>
}