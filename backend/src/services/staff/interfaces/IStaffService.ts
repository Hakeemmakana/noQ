import { ICreateReqStaff, IGetStaffDto } from "../../../dtos/admin/staff/staff-create.dto";
import { IPaginatedDataStaff, IStaffResponseDto } from "../../../dtos/admin/staff/staff.response.dto";
import { IStaff } from "../../../models/staff";

export default interface IStaffService {
    getAllStaff(data:IGetStaffDto, hotelId: string): Promise<IPaginatedDataStaff<IStaffResponseDto>>;
    createStaff(data: ICreateReqStaff, hotelId: string): Promise<IStaff>;
    statusChangeStaff(id: string, hotelId: string, status: "active" | "inactive"): Promise<IStaff | null>;
    updateStaff(id: string, hotelId: string, data: ICreateReqStaff): Promise<IStaff | null>;
    deleteStaff(id: string, hotelId: string): Promise<IStaff | null>;
}