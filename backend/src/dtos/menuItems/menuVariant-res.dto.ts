import { IMenuItem } from "../../models/menuItem";
import { IMenuVariant } from "../../models/menuVarient";
export interface IMenuItemwithVariantDetailsResponseDto {
    name: string;
    stock: number;
    stockMode: string;
    itemImage:string;
    variants: IResVariant[];

}
interface IResVariant {
    _id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    stockFactor: number;
    nutrition: {
        servingSize?: string;
        calories?: number;
        protein?: number;
        carbohydrates?: number;
        fat?: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
    }
}
export function toOneMenuWithVariant(data: IMenuItem): IMenuItemwithVariantDetailsResponseDto {
    return {
        name: data.itemName,
        stock: data.stock,
        stockMode: data.stockMode,
        itemImage:data.itemImage,
        variants: data.variants.map(toVariant)
    }
}
function toVariant(data: IMenuVariant): IResVariant {
    return {
        _id: data?._id?.toString() ?? '',
        name: data.name,
        image: data.image ?? '',
        price: data.price,
        stock: data.stock ?? 0,
        stockFactor: data.stockFactor ?? 0,
        nutrition: {
            servingSize: data.nutrition?.servingSize,
            calories: data.nutrition?.calories,
            protein: data.nutrition?.protein,
            carbohydrates: data.nutrition?.carbohydrates,
            fat: data.nutrition?.fat,
            fiber: data.nutrition?.fiber,
            sugar: data.nutrition?.sugar,
            sodium: data.nutrition?.sodium
        }
    }
}
export interface IResMenuDetailsDto {
    _id?: string;
    itemName:string;
    itemImage: string;
    category?: string;
    description: string;
    variants: IResVariantUserMenuDetails[]
}
interface IResVariantUserMenuDetails {
    _id: string;
    name: string;
    image: string;
    price: number;
    nutrition: {
        servingSize?: string;
        calories?: number;
        protein?: number;
        carbohydrates?: number;
        fat?: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
    }
}

export function toMenuDetailsDto(data: IMenuItem): IResMenuDetailsDto {
    return {
        _id: data._id?.toString(),
        itemName: data.itemName,
        itemImage: data.itemImage,
        category: data.category.toString(),
        description: data.description,
        variants:data.variants.map(toVarinatUserMenuDetails)
    }
}
function toVarinatUserMenuDetails(data: IMenuVariant): IResVariantUserMenuDetails {
    return {
        _id: data?._id?.toString() ?? '',
        name: data.name,
        image: data.image ?? '',
        price: data.price,
        nutrition: {
            servingSize: data.nutrition?.servingSize,
            calories: data.nutrition?.calories,
            protein: data.nutrition?.protein,
            carbohydrates: data.nutrition?.carbohydrates,
            fat: data.nutrition?.fat,
            fiber: data.nutrition?.fiber,
            sugar: data.nutrition?.sugar,
            sodium: data.nutrition?.sodium
        }
    }
}