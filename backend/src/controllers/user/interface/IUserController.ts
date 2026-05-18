import { Request,Response,NextFunction } from "express";

export default interface IUserController{
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    statusChange(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserProfile(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateUserProfilePicture(req:Request,res:Response,next:NextFunction):Promise<void>;
}