import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import IReportController from "../interface/IReportController";
import {  Response, NextFunction } from "express";
import { AuthRequest } from "../../../middleware/jwt";
import { AppError } from "../../../middleware/errorHandler";
import { HOTEL_ID_NOT_FOUND } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { apiResponse, csvResponse, pdfResponse } from "../../../utils/apiResponse";
import IReportService from "../../../services/report/interface/IReportService";
@injectable()
export default class reportController implements IReportController{
    constructor(@inject(TYPES.ReportService) private _reportService:IReportService){}
    getDashboard=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
        try {
            
            const query=req.query
            const hotelId=req.admin?.id
            if(!hotelId){
                throw new AppError(HOTEL_ID_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
            const resData=await this._reportService.getDashBoard(hotelId,query)
            apiResponse(res,HttpStatus.OK,'Success',resData)
        } catch (error) {
            next(error)
        }
    }
    getPdfReport=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
        try {
            const hotelId=req.admin?.id
            const query=req.query 
            if(!hotelId){
                throw new AppError(HOTEL_ID_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
           const resPdf= await this._reportService.revenueReportPdf(hotelId,query)
            pdfResponse(res,resPdf,'revenue-pdf')
        } catch (error) {
            next(error)
        }
    }
    getCsvReport=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
        try {
            const hotelId=req.admin?.id
            const query=req.query 
            if(!hotelId){
                throw new AppError(HOTEL_ID_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
           const resCsv= await this._reportService.revenueReportCsv(hotelId,query)
            csvResponse(res,resCsv,'revenue-csv')
        } catch (error) {
            next(error)
        }
    }

}