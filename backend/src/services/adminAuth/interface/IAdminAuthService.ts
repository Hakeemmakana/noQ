import { IAdminResponseDto } from "../../../dtos/admin/hotelAdminDto/admin.response.dto";

export default interface IAdminAuthService{
    login(email:string,password:string):Promise<{user:IAdminResponseDto,accessToken:string,refreshToken:string}>;
    refreshToken(refreshToken:string):Promise<{newAccessToken:string}>;
}