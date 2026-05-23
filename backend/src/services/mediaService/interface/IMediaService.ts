export default interface IMediaService {
  upload(file: Express.Multer.File): Promise<string>;
  delete(fileUrl: string): Promise<void>;
  getSignedUrl(key: string): Promise<string>;
  uploadProfile(file: Express.Multer.File): Promise<string>;
}