import multer, { diskStorage } from "multer";
import fs from "node:fs"
import { BadRequestException } from "./error.js";
export const fileUpload = (
  allawedTypes = ["image/png", "image/jpeg", "image/gif"],
) => {
  return multer({
    fileFilter: (req, file, cd) => {
      if (!allawedTypes.includes(file.mimetype)) {
        return cd(new BadRequestException("Invalid Fromat"), false);
      }
      cd(null, true);
    },
    storage: diskStorage({
      destination: (req, file, cd) => {
        if (!fs.existsSync(`uploads/${req.user._id}`)) {
          fs.mkdirSync(`uploads/${req.user._id}`, { recursive: true });
        }
        cd(null, `uploads/${req.user._id}`);
      },
      filename: (req, file, cd) => {
        cd(null, Date.now() + "__" + Math.random() + "__" + file.originalname);
      },
    }),
  });
};