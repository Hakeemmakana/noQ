
import { IUser } from "../../../types/user";
import { PaginatedResult } from "../../../types/pagination";
import { updateUserProfileInput } from "../../../dtos/user/create-user.dto";
import { IUserMappedData } from "../../../dtos/user/user-response.dto";

export default interface IUserService{
    getAllUsers(search:string,page:number):  Promise<PaginatedResult<IUserMappedData>>;
    statusChange(userId:string,status:'active'|'blocked'): Promise<IUser|null>;
    deleteUser(usrerId:string):Promise<IUser|null>;
    updateUserProfile(userId:string,data:updateUserProfileInput):Promise<IUserMappedData>
    getProfile(userId:string):Promise<IUserMappedData>
    updateUserProfilePicture(userId:string,file:Express.Multer.File):Promise<IUser|null>
}