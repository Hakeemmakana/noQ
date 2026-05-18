import { IUser } from "../../types/user";
export interface IUserMappedData {
    _id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
    phone: string;
    imageUrl?: string
    dob?:string;
}

export const userDataMapping = (user: IUser): IUserMappedData => {
    return {
        _id: user?._id?.toString()??'',
        name: user.name,
        email: user.email,
        // isAdmin: user.isAdmin,
        phone: user.phone,
        imageUrl: user.imageUrl,
        dob:user.dob?.toString()
    }
}