// src/types/qrOrderingTypes.ts
export type ScanQrApiResponse = {
  success: boolean;
  message: string;
  hotelName: string;
  hotelSlug: string;
  tableNumber: string;
  hotelImage: string;
  tableId:string;
};

export type ScanState = "idle" | "scanning" | "validating" | "success" | "error";