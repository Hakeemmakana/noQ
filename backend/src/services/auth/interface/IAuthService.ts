import { createUserDto } from "../../../dtos/user/create-user.dto";
import { IUserMappedData } from "../../../dtos/user/user-response.dto";

export interface IAuthService{
    register(userData:createUserDto):Promise<{message:string}>;
    verifyOtp(email:string,otp:string,purpose:string):Promise<{
    message: string;
    token: string;
    userId: string;
  }>;
  forgetPassword(email:string):Promise<{status:number,message:string}>;
  resendOtp(email:string,purpose:string):Promise<{status:number,message:string}>;
  login(email:string,password:string,context:string):Promise<{user:IUserMappedData,accessToken:string,refreshToken:string}>;
  resetPassword(token:string,newPassword:string):Promise<{message:string}>;
  googleAuth(accessToken:string):Promise<{user:IUserMappedData,accessToken:string,refreshToken:string}>;
  refreshToken(refreshToken:string):Promise<{newAccessToken:string}>;
}