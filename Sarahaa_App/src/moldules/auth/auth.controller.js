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
import { signupValidation, loginValidation } from "./auth.validation.js";
import { validate } from "../../middelware/validation.middelware.js";
import {
  login,
  loginWithGoogle,
  logout,
  logOutFromAllDevices,
  refreshTokenService,
  sendOtp,
  signup,
  verifyAccount,
} from "./auth.service.js";
import { isAuthenticated } from "../../middelware/isAuthenticated.js";
import { redisClient } from "../../DB/redis.connection.js";
const router = new Router();

router.post("/signup", async (req, res, next) => {
  const signedupData = await signup(req.body);
  return res.status(201).json({
    message: "done",
    success: true,
    data: { signedupData },
  });
});

router.post("/login", validate(loginValidation), async (req, res, next) => {
  const { accsessToken, refreshToken } = await login(req.body);
  redisClient.set(`rt__${req.body.email}`, refreshToken);
  return res.status(200).json({
    message: "login successfully",
    success: true,
    data: { accsessToken, refreshToken },
  });
});

router.patch("/verify-account", async (req, res, next) => {
  await verifyAccount(req.body);
  return res.status(201).json({ msg: "verified successfully", success: true });
});

router.post("/resendotp", async (req, res, next) => {
  await sendOtp(req.body);
  return res.status(201).json({ msg: "otp send" });
});

router.post("/refresh-token", async (req, res, next) => {
  const Authorization = req.headers.authorization;
  const newTokens = await refreshTokenService(Authorization);
  return res.status(200).json({
    message: "done",
    success: true,
    data: { newTokens },
  });
});

router.patch(
  "/logout-from-all-devices",
  isAuthenticated,
  async (req, res, next) => {
    await logOutFromAllDevices(req.user);
    return res
      .status(200)
      .json({ msg: "logout From All Devices", success: true });
  },
);

router.post("/logout", isAuthenticated, async (req, res, next) => {
  await logout(req.payload);
  return res.status(200).json({ msg: "logout successfully", success: true });
});
router.post("/signup/gmail", async (req, res, next) => {
  const { idToken } = req.body;
  console.log(idToken);
  const tokens = await loginWithGoogle(idToken);
  return res.status(200).json({
    message: "login with google successfully",
    success: true,
    data: { tokens },
  });
});

export const authRouter = router;
