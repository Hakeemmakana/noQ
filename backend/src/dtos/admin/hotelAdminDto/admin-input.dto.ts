
export interface IAdminProfileInputDto {
    restaurantName: string;
    fullAddress: string;
    phone: string;
    location: string;
}
export const adminProfileInputDto = (admin:IAdminProfileInputDto): IAdminProfileInputDto => {
    return {
        restaurantName: admin.restaurantName,
        fullAddress: admin.fullAddress,
        phone: admin.phone,
        location: admin.location,
    }
}