import {  Response, NextFunction } from "express";
import { INotificationController } from "../interface/INotificationController";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import INotificationService from "../../../services/notificationService/interface/INotifactionService";
import { apiResponse } from "../../../utils/apiResponse";
import { AuthRequest } from "../../../middleware/jwt";
import HttpStatus from "../../../constants/httpStatusCode";
@injectable()
export default class notificationController implements INotificationController {
    constructor(@inject(TYPES.NotificationService) private _notificationService: INotificationService) { }
    getUserNotification = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id as string
            const resData = await this._notificationService.getUserNotification(userId)
            apiResponse(res, HttpStatus.OK, 'succes', resData)
        } catch (error) {
            next(error)
        }
    }
    getChefNotification = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.hotelId as string
            const resData = await this._notificationService.getChefNotification(hotelId)
            apiResponse(res, HttpStatus.OK, 'succes', resData)
        } catch (error) {
            next(error)
        }
    }
    getWaiterNotification = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.hotelId as string
            const resData = await this._notificationService.getWaiterNotification(hotelId)
            apiResponse(res, HttpStatus.OK, 'succes', resData)
        } catch (error) {
            next(error)
        }
    }
    markNotificationAsRead=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const notId = req.params.id as string
            await this._notificationService.markNotificationAsRead(notId)
            apiResponse(res, HttpStatus.OK, 'succes')
        } catch (error) {
            next(error)
        }

    }
    markNotificationAsAllRead=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
        try {
            const hotelId = req.hotelId as string
            const staffType=req?.staffRole as string
            await this._notificationService.markNotificationAsAllRead(hotelId,staffType)
            apiResponse(res, HttpStatus.OK, 'succes')
        } catch (error) {
            next(error)
        }
    }
    markNotificationAsAllReadUser=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
        try {
            const userId = req.user?.id as string
            await this._notificationService.markNotificationAsAllReadUser(userId)
            apiResponse(res, HttpStatus.OK, 'succes')
        } catch (error) {
            next(error)
        }
    }

}