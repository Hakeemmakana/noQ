import { IStaff } from "../../../models/staff";

export interface IStaffResponseDto {
    id: string;
    name: string;
    status:'active'|'inactive';
    role:'waiter'|'chef';
    password:string;
    email:string;
}

interface IPaginatedData<T>{
    total:number;
    page:number;
    limit:number;
    data:T[]
}


 function formatStaffResponse(data: IStaff): IStaffResponseDto {
    return {
        id: data._id?.toString()??'',
        name: data.name,
        status:data.isActive?'active':'inactive',
        email:data.email,
        role:data.role,
        password:data.password
    };
}

export function toPaginatedStaffResponse(paginatedData:IPaginatedData<IStaff>):IPaginatedData<IStaffResponseDto> {
    
    return {
        total: paginatedData.total || 0,    
        page: paginatedData.page || 1,
        limit: paginatedData.limit || 8,
        data: (paginatedData.data || []).map(formatStaffResponse)
    };
}