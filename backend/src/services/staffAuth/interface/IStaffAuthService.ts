import { IStaffAuthResponseDto } from "../../../dtos/staffAuth/IStaffResponse.dto";

export default interface IStaffAuthService{
    login(email:string,password:string):Promise<{staff:IStaffAuthResponseDto,accessToken:string,refreshToken:string}>;
    refreshToken(refreshToken:string):Promise<{newAccessToken:string}>;
}