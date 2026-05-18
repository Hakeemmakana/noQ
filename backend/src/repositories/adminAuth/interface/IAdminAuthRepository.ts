import { HotelAdminDocument } from "../../../models/hotelAdmin";

export default interface IAdminAuthRepository{
    findById(id: string): Promise<HotelAdminDocument | null>;
    findByEmail(email:string):Promise<HotelAdminDocument | null>;
}