import { inject, injectable } from "inversify";
import IReportService from "../interface/IReportService";
import { TYPES } from "../../../DI/types";
import {  IDashboardResponse, IReportQueryFromFront, toReportQuery } from "../../../dtos/report/req.reportDto";
import IOrderItemRepository from "../../../repositories/orderItems/interfaces/IOrderItemRepository";
import { generateRevenueReportPdf } from "../../../utils/pdfReport/generatePdf";
import { createRevenueReportCsv } from "../../../utils/csvReport/generateCsvReport";
@injectable()
export default class ReportService implements IReportService {
    constructor(@inject(TYPES.OrderItemRepository) private _orderItemRepo:IOrderItemRepository){}
    getDashBoard=async(hotelId: string, query: IReportQueryFromFront): Promise<IDashboardResponse> =>{
        const limit=6
        const queryDto=toReportQuery(query)
        const res=await this._orderItemRepo.getDashBoard(hotelId,queryDto,limit)
        return res
    }
    revenueReportPdf=async(hotelId: string, query: IReportQueryFromFront): Promise<Buffer> =>{
        const queryDto=toReportQuery(query)
        const res=await this._orderItemRepo.getRevenueReport(hotelId,queryDto)
        const pdf=generateRevenueReportPdf(res)
        return pdf
    }
    revenueReportCsv=async(hotelId: string, query: IReportQueryFromFront): Promise<Buffer>=> {
        const queryDto=toReportQuery(query)
        const res=await this._orderItemRepo.getRevenueReport(hotelId,queryDto)
        const csv=createRevenueReportCsv(res)
        return csv


        
    }
    

}