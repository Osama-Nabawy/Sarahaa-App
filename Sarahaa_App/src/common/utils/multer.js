import multer, { diskStorage } from "multer";
import fs from "node:fs";
import { BadRequestException } from "./error.js";
export const fileUpload = (
  allawedTypes = ["image/png", "image/jpeg", "image/gif", "image/jpg"],
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
        const folder = req.user
          ? `uploads/${req.user._id}`
          : `uploads/${req.params.r_id}`;
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true });
        }
        cd(null, folder);
      },
      filename: (req, file, cd) => {
        cd(null, Date.now() + "__" + Math.random() + "__" + file.originalname);
      },
    }),
  });
};
