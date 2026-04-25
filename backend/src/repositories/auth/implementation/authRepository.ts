import { User, UserDocument } from "../../../models/user";
import { IUser } from "../../../types/user";
import { BaseRepository } from "../../IBaseRepository";
import { IAuthRepository } from "../interface/IAuthRepository";


export class AuthRepository extends BaseRepository<IUser> implements IAuthRepository{
    constructor() {
        super(User)
    }
    async register(userData: {
        name: string,
        email: string,
        phone?: string,
        isAdmin: boolean,
        password?: string,
        googleId?: string,
        imageUrl?: string,
    }): Promise<{ user: UserDocument }> {

        const data = {
        name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin,
        ...(userData.password && { password: userData.password }),
        ...(userData.phone && { phone: userData.phone }),
        ...(userData.googleId && { googleID: userData.googleId }),
        ...(userData.imageUrl && { imageUrl: userData.imageUrl }),
        }
        const savedUser=await this.create(data)
        return {user:savedUser}

    }
    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.getByFilter({
            email:email,
            isVerified:true,
            isDeleted:false
        })
    }

}