import { injectable } from "inversify";
import HotelAdmin, { HotelAdminDocument, IHotelAdmin } from "../../../models/hotelAdmin";
import { BaseRepository } from "../../IBaseRepository";
import IAdminAuthRepository from "../interface/IAdminAuthRepository";
@injectable()
export default class AdminAuthRepository extends BaseRepository<IHotelAdmin> implements IAdminAuthRepository {
    constructor() {
        super(HotelAdmin)
    }
    async findById(id: string) {
        return await this.getById(id)
    }
    async findByEmail(email: string): Promise<HotelAdminDocument | null> {
        return await this.getByFilter({
            email: email,
            isDeleted: false
        })
    }
}