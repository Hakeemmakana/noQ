import multer from "multer";
import { AppError } from "./errorHandler";
import HttpStatus from "../constants/httpStatusCode";
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new AppError("Only image files allowed",HttpStatus.INTERNAL_SERVER_ERROR));
    }
    cb(null, true);
  },
});
export default upload