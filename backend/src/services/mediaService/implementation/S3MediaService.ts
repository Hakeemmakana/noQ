import s3 from "../../../config/s3config";
import IMediaService from "../interface/IMediaService";
import AWS from "aws-sdk";
import { injectable } from "inversify";
@injectable()
export default class S3MediaService implements IMediaService{
    async upload(file: Express.Multer.File): Promise<string> {
        const params:AWS.S3.PutObjectRequest={
            Bucket:process.env.AWS_BUCKET_NAME!,
            Key:`uploads/${Date.now()}-${file.originalname}`,
            Body:file.buffer,
            ContentType:file.mimetype
        }
        const result=await s3.upload(params).promise();
        return result.Location
    }
    
}