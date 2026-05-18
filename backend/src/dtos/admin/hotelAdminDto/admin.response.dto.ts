import {  IHotelAdmin } from "../../../models/hotelAdmin";

export interface IAdminResponseDto {
    _id: string;
    restaurantName: string;
    email: string;
    fullAddress: string;
    phone: string;
    location: string;
    restaurantCertificate: string;
    imageUrl?: string;
    slug: string;
}
export const adminResponseDto = (admin: IHotelAdmin): IAdminResponseDto => {
    return {
        _id: admin?._id!.toString(),
        restaurantName: admin.restaurantName,
        email: admin.email,
        fullAddress: admin.fullAddress,
        phone: admin.phone,
        location: admin.location,
        restaurantCertificate: admin.restaurantCertificate,
        imageUrl: admin.imageUrl,
        slug: admin.slug
    }
}