
import { IUser } from "../../../types/user";
import { PaginatedResult } from "../../../types/pagination";

export default interface IUserService{
    getAllUsers(search:string,page:number):  Promise<PaginatedResult<IUser>>;
    statusChange(userId:string,status:'active'|'blocked'): Promise<IUser|null>;
    deleteUser(usrerId:string):Promise<IUser|null>;
    updateUserProfile(userId:string,data:Partial<IUser>):Promise<IUser|null>
    getProfile(userId:string):Promise<IUser|null>
    updateUserProfilePicture(userId:string,file:Express.Multer.File):Promise<IUser|null>
}