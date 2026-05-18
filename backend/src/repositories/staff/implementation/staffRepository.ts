import { QueryFilter, Types } from "mongoose";
import Staff, { IStaff } from "../../../models/staff";
import { PaginatedResult } from "../../../types/pagination";
import { BaseRepository } from "../../IBaseRepository";
import { IStaffRepository } from "../interfaces/IStaffRepository";
type CreateStaffData = Partial<IStaff> & {
  hotelId:Types.ObjectId
};
export default class StaffRepository extends BaseRepository<IStaff> implements IStaffRepository {
    constructor() {
        super(Staff)
    }
    async createStaff(data: Partial<IStaff>,hotelId:string): Promise<IStaff> {
        const hotelObjectId=new Types.ObjectId(hotelId)
                const staffData:CreateStaffData={
                    ...data,
                    isDeleted:false,
                    hotelId:hotelObjectId
                }
        return await this.create(staffData);
    }
    async getAllStaff(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<IStaff>> {
        const hotelObjectId=new Types.ObjectId(hotelId)
        const filter: QueryFilter<IStaff>= {
            isDeleted: false,
            hotelId: hotelObjectId
        }
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        }
        return await this.getPaginatedData(filter, page, limit)
    }
    async getStaffById(id: string): Promise<IStaff | null> {
        return await this.getById(id)
    }
    async updateStaff(id: string, data: Partial<IStaff>): Promise<IStaff | null> {
        return await this.updateById(id, data)
    };
    async statusChangeStaff(id: string, status: string): Promise<IStaff | null> {
        const updateData = {
            isActive: status === 'active'
        }
        return await this.updateById(id, updateData)
    }
    async deleteStaff(id: string): Promise<IStaff | null> {
        return await this.deleteById(id);
    }
    async findByEmail(email: string, hotelId: string, excludeId?: string): Promise<IStaff | null> {
            const hotelObjectId=new Types.ObjectId(hotelId)
            const query:QueryFilter<IStaff>={
                email:{$regex:email,'$options':'i'},
                hotelId:hotelObjectId
            }
            if(excludeId){
                query._id={$ne:excludeId}
            }
            return await this.getByFilter(query)
        }
    
}