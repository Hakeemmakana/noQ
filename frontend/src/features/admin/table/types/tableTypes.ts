export type TableCapacity = 2 | 4 | 6;
export type TableStatus = 'active'|'inactive'
export type tableStatustoBack= 'active'|'inactive'
export interface HotelTable {
  id: string;
  number: string;
  capacity: TableCapacity;
  status: tableStatustoBack;
  qrValue: string;
  createdAt: string;
}

export interface GetTablesResponse {
  data: HotelTable[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TableFormValues {
  number: string;
  capacity: TableCapacity;
  status: tableStatustoBack;
}