import Staff, { IStaff } from "../../../models/staff";
import { BaseRepository } from "../../IBaseRepository";
import IStaffAuthRepository from "../interface/IStaffAuthRepository";

export default class StaffAuthRepository extends BaseRepository<IStaff> implements IStaffAuthRepository {
    constructor() {
        super(Staff)
    }
    async findByEmail(email: string): Promise<IStaff | null> {
        return await this.getByFilter({
            email: email,
            isDeleted: false
        })
    }
    async findById(id: string): Promise<IStaff | null> {
        return await this.getById(id)
    }
} 