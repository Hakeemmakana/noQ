import { PaginatedResult } from "../../types/pagination";
import { IUser } from "../../types/user";
export interface IUserMappedData {
    _id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
    phone: string;
    imageUrl?: string
    isVerified:boolean;
    dob?:string;
}

export const userDataMapping = (user: IUser): IUserMappedData => {
    return {
        _id: user?._id?.toString()??'',
        name: user.name,
        email: user.email,
        isVerified:user.isVerified,
        // isAdmin: user.isAdmin,
        phone: user.phone,
        imageUrl: user.imageUrl,
        dob:user.dob?.toString()
    }
}

export function toPaginateUsersResponse(paginatedData:PaginatedResult<IUser>):PaginatedResult<IUserMappedData>{
     return {
        total: paginatedData.total || 0,    
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        totalPages:paginatedData.totalPages,
        // We use our simple function inside the map
        data: (paginatedData.data || []).map(userDataMapping)
    };
}