import path from "path";
import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg")
      cb(null, "public/images");
    else
      cb(null, "public/others");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    // for creating unique file name
    cb(null, file.originalname + "-" + Date.now());
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  const fileType = /jpeg|png|jpg/;  // regex
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if(extname && mimeType) return cb(null, true);

  cb(new Error("Invalid file type"));
}


// initialize multer upload configuration
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024} // max file size 10 mb
})