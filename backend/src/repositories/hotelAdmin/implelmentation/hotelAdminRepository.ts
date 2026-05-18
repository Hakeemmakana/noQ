import { injectable } from "inversify";
import HotelAdmin, { IHotelAdmin } from "../../../models/hotelAdmin";
import { BaseRepository } from "../../IBaseRepository";
import IHotelAdminRepository from "../interface/IHotelAdminRepository";
@injectable()
export default class HotelAdminRepository extends BaseRepository<IHotelAdmin> implements IHotelAdminRepository{
    constructor(){
        super(HotelAdmin)
    }
     async updateAdminProfile(hotelId:string,data:Partial<IHotelAdmin>):Promise<IHotelAdmin|null>{
            return await this.updateById(hotelId,data)
        }
        async getProfile(hotelId:string):Promise<IHotelAdmin|null>{
            return await this.getById(hotelId)
        }

}