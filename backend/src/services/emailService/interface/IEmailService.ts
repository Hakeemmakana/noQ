export interface IEmailService{
    sendOtpMail(email:string,otp:string):Promise<void>
    resendOtpMail(email:string,otp:string):Promise<void>
}