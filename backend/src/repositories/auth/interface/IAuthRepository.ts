import { UserDocument } from "../../../models/user";

export interface IAuthRepository {
    register(userData: {
        name: string;
        email: string;
        phone?: string;
        isAdmin: boolean;
        password?: string;
        googleId?: string;
        imageUrl?:string,
    }): Promise<{ user: UserDocument }>
    findByEmail(email: string): Promise<UserDocument | null>
    // findById(id: string): Promise<UserDocument | null>;
    // findOneAndUpdate(userId: string, data: Partial<IUser>): Promise<UserDocument | null>;
    // findByIdAndUpdate(userId: string, data: Partial<IUser>): Promise<UserDocument | null>;
    // findAdmin(): Promise<UserDocument | null>;
}