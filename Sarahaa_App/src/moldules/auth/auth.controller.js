import { Router } from "express";
import { checkUserExist, createUser } from "../user/user.service.js";
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
  createAccsessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../../common/index.js";
import { signupValidation,loginValidation } from "./auth.validation.js";
import { validate } from "../../middelware/validation.middelware.js";
import { login, logout, logOutFromAllDevices, sendOtp, signup, verifyAccount } from "./auth.service.js";
import { isAuthenticated } from "../../middelware/isAuthenticated.js";
const router = new Router();

router.post("/signup",  async (req, res, next) => {
  
  const signedupData = await signup(req.body);
  return res.status(201).json({
    message: "done",
    success: true,
    data: { signedupData },
  });
});

router.post("/login", validate(loginValidation),async (req, res, next) => {
  const {accsessToken ,refreshToken} =await login(req.body)
    return res.status(200).json({
      message: "login successfully",
      success: true,
      data: { accsessToken,refreshToken },
    });
});

router.patch("/verify-account", async(req,res,next) => {
  await verifyAccount(req.body)
  return res.status(201).json({msg : "verified successfully",success:true})
})

router.post("/resendotp",async (req, res, next) => {
  await sendOtp(req.body)
  return res.status(201).json({msg:"otp send"})
})

router.post("/refresh-token", async (req, res, next) => {
    const Authorization = req.headers.authorization;
    const payload = verifyRefreshToken(Authorization);
    const newTokens = {
      accsessToken: createAccsessToken(payload.sub, payload.userName, payload.Email),
        refreshToken: createRefreshToken(payload.sub, payload.userName, payload.Email),       
    }
    return res.status(200).json({
        message: "done",
        success: true,
        data: { newTokens },
      });
});
 

router.patch("/logout-from-all-devices", isAuthenticated,async (req,res,next) => {
  await logOutFromAllDevices(req.user)
  return res.status(200).json({msg:"logout From All Devices",success:true})
})

router.post("/logout", isAuthenticated,async (req,res,next) => {
  await logout(req.payload)
  return res.status(200).json({msg:"logout successfully",success:true})
})

export const authRouter = router;
