import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import { BadRequestException } from "../common/index.js";

// Middleware to validate file type by magic number (file signatures)
export const fileValidation = async (req, res, next) => {
    if (!req.file) {
      return next(new BadRequestException("No file uploaded"));
    }
    // get the file path
    const filePath = req.file.path;
    // read the file and return buffer
    const buffer = fs.readFileSync(filePath);
    // get the file type
    const type = await fileTypeFromBuffer(buffer);
    // validate
    const allowedTypes = ["image/jpeg", "image/png"];
    console.log(req.file.path)
    if (!type || !allowedTypes.includes(type.mime)) {
        fs.unlinkSync(filePath);
        return next(new BadRequestException("Invalid file type"));
    }
      

    return next();
  
};
