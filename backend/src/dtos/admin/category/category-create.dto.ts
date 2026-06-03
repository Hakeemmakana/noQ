export interface ICreateCategoryDto{
    name:string;
    description:string;
    isAvailable:boolean;
}
// interface fromFrontData{
//     name:string;
//     description:string;
//     status:'active'|'inactive'
// }
export interface IGetCategoryDto{
    searchVal:string;
    page:number;
}
export interface ICategoryReqDto{
    name:string;
    description: string;
    status: 'active'|'inactive';
}
export interface IUpdateCategoryReqDto{
    id:string;
    name:string;
    description: string;
    status: 'active'|'inactive';
}
export interface IUpdateCategoryDto{
    id:string;
    name:string;
    description: string;
    isAvailable: boolean;
}
export const createCategoryDto=(data:ICategoryReqDto):ICreateCategoryDto=>{
    return {
        name:data.name ??'',
        description:data.description ??'',
        isAvailable:data.status=== 'active'

    }
}
export const getCategoryDto=(data:IGetCategoryDto):IGetCategoryDto=>{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1

    }
}

export const updateCategoryDto=(data:IUpdateCategoryReqDto):IUpdateCategoryDto=>{
    return {
        id:data.id,
        name:data.name ??'',
        description:data.description ??'',
        isAvailable:data.status=== 'active'

    }
}
