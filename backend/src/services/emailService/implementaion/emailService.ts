import nodemailer, { Transporter } from "nodemailer";
import { IEmailService } from "../interface/IEmailService";
import logger from "../../../config/logger";
import { injectable } from "inversify";


@injectable()
export class EmailService implements IEmailService {
    private transporter: Transporter
    private fromEmail: string
    constructor() {
        console.log('called constructor',process.env.NODEMAILER_EMAIL,
                 process.env.NODEMAILER_EMAIL_PASSWORD)
        this.fromEmail = process.env.NODEMAILER_EMAIL as string
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_EMAIL_PASSWORD
            },
        })
    }
    async sendOtpMail(email: string, otp: string): Promise<void> {

        const mailOption = {
            from: this.fromEmail,
            to: email,
            subject: "Your One-Time Password for Verification",
            html: `
                <p><strong>Hello,</strong></p>
                <p>Your one-time password (OTP) for verification is:</p>
                <h2 style="color: #FF6B00;">${otp}</h2>
                <p>This OTP is valid for <strong>120 seconds</strong>. Do not share it with anyone.</p>
                <p>Please complete your registration within <strong>10 minutes</strong>.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>NoQ Support Team</strong></p>
                `,
        };
        try {
            await this.transporter.sendMail(mailOption);
            console.log('otp')
            logger.info(`OTP send to${email} ,[${otp}]`);
        } catch (error) {
            logger.error('error while sending OTP email',error);
        }
    }
    async resendOtpMail(email: string, otp: string): Promise<void> {
        const mailOption={
            from:this.fromEmail,
            to:email,
            subject:'Your New One-Time Password for Verification',
            html: `
                <p><strong>Hello,</strong></p>
                <p>Your new one-time password (OTP) for verification is:</p>
                <h2 style="color: #FF6B00;">${otp}</h2>
                <p>This OTP is valid for <strong>120 seconds</strong>.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>NoQ Support Team</strong></p>
                `,
        }
        try {
            await this.transporter.sendMail(mailOption);
            logger.info(`Resend OTP to ${email},[${otp}]`);
        } catch (error) {
            logger.error('error occured while resending otp',error);
        }

    }

}