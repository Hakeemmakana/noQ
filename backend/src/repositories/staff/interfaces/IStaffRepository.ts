import { IStaff } from "../../../models/staff";
import { PaginatedResult } from "../../../types/pagination";

export interface IStaffRepository {
    createStaff(data: Partial<IStaff>,hotelId:string): Promise<IStaff>;
    getAllStaff(search: string, page: number, limit: number, hotelId: string): Promise<PaginatedResult<IStaff>>
    getStaffById(id: string): Promise<IStaff | null>;
    updateStaff(id: string, data: Partial<IStaff>): Promise<IStaff | null>;
    statusChangeStaff(id: string, status: string): Promise<IStaff | null>;
    deleteStaff(id: string): Promise<IStaff | null>;
    findByEmail(email: string, hotelId: string, excludeId?: string): Promise<IStaff | null>

}