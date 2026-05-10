import { UserDocument } from "../../../models/user";
import { PaginatedResult } from "../../../types/pagination";
import { IUser } from "../../../types/user";

export interface IUserRepository{
    getAllUsers(search:string,page:number,limit:number): Promise<PaginatedResult<IUser>>;
    changeStatus(userId:string,status:'active'|'blocked'):Promise<UserDocument|null>;
    deleteUser(userId:string,):Promise<UserDocument|null>;
}