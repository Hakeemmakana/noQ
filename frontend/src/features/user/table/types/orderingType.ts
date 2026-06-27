// src/types/qrOrderingTypes.ts
export type ScanQrApiResponse = {
  
  message: string;
 data:Idata
};
export type Idata={
   hotelName: string;
   success: boolean;
  hotelSlug: string;
  tableNumber: string;
  hotelImage: string;
  tableId:string;
}

export type ScanState = "idle" | "scanning" | "validating" | "success" | "error";