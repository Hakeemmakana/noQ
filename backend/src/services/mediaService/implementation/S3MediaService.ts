// import s3 from "../../../config/s3config";
import IMediaService from "../interface/IMediaService";
import AWS from "aws-sdk";
import { injectable } from "inversify";
@injectable()
export default class S3MediaService implements IMediaService {
    private s3: AWS.S3;
    private bucketName: string;
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME!
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            region: process.env.AWS_REGION!,
        });
    }
    async upload(file: Express.Multer.File): Promise<string> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: `uploads/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const result = await this.s3.upload(params).promise();
        return result.Location
    }
    async uploadProfile(file: Express.Multer.File): Promise<string> {
        const key = `profile/${Date.now()}-${file.originalname}`;
        const params: AWS.S3.PutObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        const result = await this.s3.upload(params).promise();
        return key
    }
    async delete(fileUrl: string): Promise<void> {
        const url = new URL(fileUrl)
        const key = decodeURIComponent(
            url.pathname.substring(1)
        );

        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: this.bucketName,
            Key: key,
        };

        await this.s3.deleteObject(params).promise();
    }
    async getSignedUrl(key: string): Promise<string> {
        const expiresIn = Number(process.env.AWS_SIGNED_URL_EXPIRES);

        const params = {
            Bucket: this.bucketName,
            Key: key,
            Expires: expiresIn,
        };

        const signedUrl =
            await this.s3.getSignedUrlPromise(
                "getObject",
                params
            );

        return signedUrl;
    }

}