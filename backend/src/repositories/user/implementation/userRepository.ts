import { QueryFilter } from "mongoose";
import { User, UserDocument } from "../../../models/user";
import { PaginatedResult } from "../../../types/pagination";
import { IUser } from "../../../types/user";
import { BaseRepository } from "../../IBaseRepository";
import { IUserRepository } from "../interface/IUserRepository";

export default class  UserRepository extends BaseRepository<IUser> implements IUserRepository{
    constructor(){
        super(User)
    }
    async getAllUsers(search:string,page:number,limit:number): Promise<PaginatedResult<IUser>> {

        const filter:QueryFilter<IUser>={
            isDeleted:false
        }
        if(search){
            filter.$or=[
                {name:{$regex:search,$options:'i'}},
                {email:{$regex:search,$options:'i'}},
            ]
        }
        return await this.getPaginatedData(filter,page,limit)
    }
    async changeStatus(userId: string, status: "active" | "blocked"): Promise<UserDocument | null> {
        const updateData={
            isVerified:status==='active'
        }
        return await this.updateById(userId,updateData)
    }
    async deleteUser(userId: string): Promise<UserDocument | null> {
        return await this.deleteById(userId)
    }
    async updateUserProfile(userId:string,data:Partial<IUser>):Promise<IUser|null>{
        
        return await this.updateById(userId,data)
    }
    async getProfile(userId:string):Promise<IUser|null>{
        return await this.getById(userId)
    }
}