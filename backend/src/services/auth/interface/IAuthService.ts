export interface IAuthService{
    register(name:string,email:string,phone:string,passwrod:string):Promise<{message:string}>;
    verifyOtp(email:string,otp:string,purpose:string):Promise<{
    message: string;
    token: string;
    userId: string;
  }>;
  
}