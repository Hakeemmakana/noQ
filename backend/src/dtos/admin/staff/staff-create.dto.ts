export interface IStaffDto{
    name:string;
    role:'waiter'|'chef';
    email:string;
    isActive:boolean;
    password:string
}
export interface ICreateReqStaff{
    name:string;
    role:'waiter'|'chef';
    email:string;
    status:'active'|'inactive';
    password:string
}


export function createStaffDto(data:ICreateReqStaff):IStaffDto{

    return {
        name:data.name,
        role:data.role,
        email:data.email,
        isActive:data.status.toLowerCase()=='active',
        password:data.password
    }
}

export interface IGetStaffDto{
    searchVal:string;
    page:number;
}
export function getStaffDto(data:Partial<IGetStaffDto>):IGetStaffDto{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1
    }
}