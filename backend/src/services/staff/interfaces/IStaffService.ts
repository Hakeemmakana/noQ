import { IStaff } from "../../../models/staff";
import { PaginatedResult } from "../../../types/pagination";

export default interface IStaffService {
    getAllStaff(searchVal: string, page: number, hotelId: string): Promise<PaginatedResult<IStaff>>;
    createStaff(data: Partial<IStaff>, hotelId: string): Promise<IStaff>;
    statusChangeStaff(id: string, hotelId: string, status: "active" | "inactive"): Promise<IStaff | null>;
    updateStaff(id: string, hotelId: string, data: Partial<IStaff>): Promise<IStaff | null>;
    deleteStaff(id: string, hotelId: string): Promise<IStaff | null>;
}