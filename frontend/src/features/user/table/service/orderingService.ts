// src/services/qrOrderingService.ts

import userApi from "../../../../services/userApi";
import getErrorMessage from "../../../../utils/getErrorMessage";
import type { Idata, ScanQrApiResponse } from "../types/orderingType";

export async function validateQrLink(qrUrl: string): Promise<Idata> {
    let apiUrl=qrUrl
    if(qrUrl.startsWith('http')){
        const parts=qrUrl.split('/').filter(Boolean)
        const hotelId=parts[parts.length-2]
        const tableId=parts[parts.length-1]
        apiUrl=`${hotelId}/${tableId}`
    }
//   const response = await axios.get<ScanQrApiResponse>(qrUrl);
try {
    
    const response = await userApi.get<ScanQrApiResponse>(`/table/${apiUrl}`);
    return response.data.data 
} catch (error) {
    throw(getErrorMessage(error))
}

//   if (!response.data.success) {
//     throw new Error(response.data.message || "QR validation failed");
//   }

}