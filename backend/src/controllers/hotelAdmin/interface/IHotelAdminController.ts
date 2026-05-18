import { Request,Response,NextFunction } from "express";

export default interface IHotelAdminController{
    updateAdminProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAdminProfile(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateAdminProfilePicture(req:Request,res:Response,next:NextFunction):Promise<void>;
}