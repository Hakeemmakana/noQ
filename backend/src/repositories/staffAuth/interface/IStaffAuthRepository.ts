import { IStaff } from "../../../models/staff";

export default interface IStaffAuthRepository {
    findById(id: string): Promise<IStaff | null>;
    findByEmail(email: string): Promise<IStaff | null>;
}