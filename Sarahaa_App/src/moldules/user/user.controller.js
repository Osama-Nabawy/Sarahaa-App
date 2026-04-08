import { Router } from "express";
import { checkUserExist, uploadProfilePictuer } from "./user.service.js";
import { userRepo } from "../../DB/index.js";
import {
  compare,
  hash,
  Message,
  BadRequestException,
  ConflictDataException,
  NotFoundException,
  SYS_Gender,
  UnAuthorizedException,
  decryption,
  encryption,

  verifyRefreshToken,
  verifyAccsessToken,
} from "../../common/index.js";
import { isAuthenticated } from "../../middelware/isAuthenticated.js";
import { fileUpload } from "../../common/utils/multer.js";
import { fileValidation } from "../../middelware/file.validation.js";

const router = Router(); 
router.post("/get-profile/", isAuthenticated , async (req, res, next) => {
  const userExist = req.user;
    if(userExist.phonenumber) userExist.phonenumber = decryption(userExist.phonenumber)
    
  return res.status(200).json({
    message: "User Data",
    success: true,
    data: { userExist },
  });
})

router.patch(
  "/upload-profile-picture",isAuthenticated,
  fileUpload().single("pp"),
  fileValidation,
  async(req, res, next) => {
    const updatedUserData = await uploadProfilePictuer(req.user, req.file.path)
    console.log(updatedUserData.pp)
    return res.json({
      msg: "updated data",
      success: true,
      data: { updatedUserData },
    });
  },
);


export const userRouter = router;
