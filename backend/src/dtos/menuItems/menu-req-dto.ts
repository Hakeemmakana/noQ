



export interface menuItemReqDto {
    productName: string;
    category: string;
    description: string;
    price: number;
    type: 'kitchen' | 'quick';
    status: 'available' | 'unavailable';
    stock?: number;
    // productImage: string
}
export interface MenuItemInputDto{
    itemName:string;
        itemImage?:string;
        category: string;
        isAvailable: boolean;
        description:string;
        price: number;
        type: 'kitchen'|'quick'
        stock: number;
}

export interface IGetMenuItemDto{
    searchVal:string;
    page:number;
}
export interface IFilterMenuItem{
    category?:string;
    search:string;
    price?:number;
    type:string;
}
export function covertMenuInputDto(data: menuItemReqDto):MenuItemInputDto {
    return {
        itemName: data.productName,
        category: data.category,
        isAvailable: data.status == 'available',
        description: data.description,
        price: data.price,
        type: data.type,
        stock: data.stock ?? 0,

    }
}
export const getMenuItemDto=(data:IGetMenuItemDto):IGetMenuItemDto=>{
    return {
        searchVal:data.searchVal??'',
        page:data.page??1

    }
}
export const getMenuItemUserDto=(data:IFilterMenuItem):IFilterMenuItem=>{
    return {
            category:data.category,
            search:data.search,
            price:Number(data.price),
            type:data.type
        }

    }
