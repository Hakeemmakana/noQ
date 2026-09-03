export interface IReportQuery {
    range_type: string;
    start_date?: string;
    end_date?: string;
}
export interface IReportQueryFromFront {
    range_type?: string;
    start_date?: string;
    end_date?: string;
}
export interface IDashboardTopProduct {
    productId: string;
    productName?: string;
    productImage?: string;
    quantity: number;
    revenue: number;
}

export interface IDashboardResponse {
    totalOrder: number;
    completedOrder: number;
    totalRevenue: number;
    topProducts: IDashboardTopProduct[];
}

export function toReportQuery(data: IReportQueryFromFront): IReportQuery {
    if(data.range_type=='custom'){
        return {
            range_type: data.range_type,
            start_date: data.start_date,
            end_date: data.end_date,
        }
    }
    return {range_type:data?.range_type??''}
}