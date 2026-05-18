export default interface IMediaService {
  upload(file: Express.Multer.File): Promise<string>;
}