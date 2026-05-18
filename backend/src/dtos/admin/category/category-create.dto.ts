export interface ICreateCategoryDto{
    name:string;
    description:string;
    isAvailable:boolean;
}
interface fromFrontData{
    name:string;
    description:string;
    status:'active'|'inactive'
}
export interface IGetCategoryDto{
    searchVal:string;
    page:number;
}
export const createCategoryDto=(data:fromFrontData):ICreateCategoryDto=>{
    return {
        name:data.name ??'',
        description:data.description ??'',
        isAvailable:data.status=== 'active'

    }
}
export const getCategoryDto=(data:Partial<IGetCategoryDto>):IGetCategoryDto=>{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1

    }
}