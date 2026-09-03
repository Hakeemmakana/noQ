import { IStaff } from "../../models/staff";


export interface IStaffAuthResponseDto {
    email: string;
    name:string;
    role:string;
    hotelId:string;
}
export const staffAuthResponseDto = (staff: IStaff): IStaffAuthResponseDto => {
    return {
        email: staff.email,
        name:staff.name,
        role:staff.role,
        hotelId:staff?.hotelId?.toString(),
        
    }
}