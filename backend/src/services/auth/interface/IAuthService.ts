export interface IAuthService{
    register(name:string,email:string,phone:string,passwrod:string):Promise<{message:string}>;
    verifyOtp(email:string,otp:string,purpose:string):Promise<{
    message: string;
    token: string;
    userId: string;
  }>;
  forgetPassword(email:string):Promise<{status:number,message:string}>
  resendOtp(email:string,purpose:string):Promise<{status:number,message:string}>
}