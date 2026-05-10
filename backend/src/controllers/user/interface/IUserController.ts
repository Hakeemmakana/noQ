import { Request,Response,NextFunction } from "express";

export default interface IUserController{
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    statusChange(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;

}