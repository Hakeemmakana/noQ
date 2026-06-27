export interface IorderNow {
    orderType: string;
    tableId: string;
}

export function toPostReqDto(data: IorderNow): IorderNow {
    return {
        orderType: data.orderType,
        tableId: data.tableId
    }
}