import {  IDashboardResponse, IReportQueryFromFront } from "../../../dtos/report/req.reportDto"

export default interface IReportService{
    getDashBoard(hotelId:string,filter:IReportQueryFromFront):Promise<IDashboardResponse>
    revenueReportPdf(hotelId:string,filter:IReportQueryFromFront):Promise<Buffer>
    revenueReportCsv(hotelId:string,filter:IReportQueryFromFront):Promise<Buffer>
}