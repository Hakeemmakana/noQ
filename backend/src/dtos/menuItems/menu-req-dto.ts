


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