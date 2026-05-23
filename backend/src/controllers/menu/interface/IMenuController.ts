import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../../middleware/jwt";

export interface IMenuItemController {
    getAllMenuItems(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    createMenuItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    statusChangeMenuItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    updateMenuItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    deleteMenuItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    // getMenuItem(req: Request, res: Response, next: NextFunction): Promise<void>;
}