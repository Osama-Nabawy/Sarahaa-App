import { OAuth2Client } from "google-auth-library";
import {
  BadRequestException,
  compare,
  ConflictDataException,
  createAccsessToken,
  createRefreshToken,
  encryption,
  hash,
  Message,
  sendEmail,
  verifyRefreshToken,
} from "../../common/index.js";
import { otpRepo, tokenRepo, userRepo } from "../../DB/index.js";
import { checkUserExist, createUser } from "../user/user.service.js";
import { loginValidation } from "./auth.validation.js";
import { redisClient } from "../../DB/redis.connection.js";
export const sendOtp = async (body) => {
  const { email } = body;
  const otpDoc = await redisClient.exists(`${email}:otp`);
  if (otpDoc) throw new BadRequestException("you have allready otp");
  const otp = Math.floor(100000 + Math.random() * 900000);
  await redisClient.set(`${email}:otp`, otp, { EX: 3 * 60 });
  // const createdOtp = await otpRepo.create({
  //   email: email,
  //   otp: otp,
  //   expiresAt: Date.now() + 1 * 60 * 1000,
  // });
  sendEmail({
    to: email,
    subject: "verify your account",
    html: `<p>verify your account with this OTP ${otp}</p>`,
  });
};
export const signup = async (body) => {
  const { email, phonenumber } = body;
  const user = await checkUserExist({
    $or: [
      { email: { $eq: email, $exists: true, $ne: null } },
      { phonenumber: { $eq: phonenumber, $exists: true, $ne: null } },
    ],
  });
  if (user) throw new ConflictDataException(Message.user.alreadyExist);
  body.password = await hash(body.password);
  if (phonenumber) {
    body.phonenumber = encryption(phonenumber);
    console.log(body.phonenumber);
  }
  await sendOtp(body);
  console.log(JSON.stringify(body));
  await redisClient.set(email, JSON.stringify(body), { EX: 3 * 60 * 60 * 24 });

  // return await createUser(body);
};

export const login = async (body) => {
  const { email, password } = body;
  const userExist = await checkUserExist({
    email: { $eq: email, $exists: true, $ne: null },
  });

  const match = await compare(
    password,
    userExist?.password || "bjeofkoernbksrkb;fvikmwrmgpoervrvs",
  );
  if (!userExist) throw new BadRequestException("invalid credentials");

  if (!match) throw new BadRequestException("invalid credentials");

  const tokens = {
    accsessToken: createAccsessToken(
      userExist._id,
      userExist.userName,
      userExist.email,
    ),
    refreshToken: createRefreshToken(
      userExist._id,
      userExist.userName,
      userExist.email,
    ),
  };
  return tokens;
};

export const verifyAccount = async (body) => {
  const { otp, email } = body;
  // const otpDoc = await otpRepo.getOne({ email })
  const otpDoc = await redisClient.exists(`${email}:otp`);

  if (!otpDoc) throw new BadRequestException("expired otp !");
  // if (otp != otpDoc.otp) {
  //     otpDoc.attempts += 1;
  //     if (otpDoc.attempts >= 3) {
  //         await otpRepo.deleteOne({email:email})
  //         throw new BadRequestException("to many tries")
  //     }
  //   await otpRepo.update({ email: email }, { attempts: otpDoc.attempts });
  //     throw new BadRequestException("Invalid otp ")
  // }
  // await userRepo.update({ email }, { isEmailVerify: true })
  let data = await redisClient.get(email);
  await userRepo.create(JSON.parse(data));
  await redisClient.del(email);
  await redisClient.del(`${email}:otp`);
  // await userRepo.deleteOne({_id : otpDoc._id})
  return true;
};
export const logOutFromAllDevices = async (user) => {
  await userRepo.update({ _id: user._id }, { cerdintialUpdatedAt: Date.now() });
  return true;
};

export const refreshTokenService = async (Authorization, deviceId) => {
  const payload = verifyRefreshToken(Authorization);
  const cashRefreshToken = await redisClient.get(
    `rt__${payload.email}__${deviceId}`,
  );
  if (!cashRefreshToken) throw new BadRequestException("invalid refresh token");
  if (cashRefreshToken !== Authorization) {
    await logOutFromAllDevices({ _id: payload.sub });
    await redisClient.del(`rt__${payload.email}__${deviceId}`);
    throw new BadRequestException("invalid refresh token");
  }
  const newTokens = {
    accsessToken: createAccsessToken(
      payload.sub,
      payload.userName,
      payload.email,
    ),
    refreshToken: createRefreshToken(
      payload.sub,
      payload.userName,
      payload.email,
    ),
  };
  redisClient.set(`rt__${payload.email}__${deviceId}`, newTokens.refreshToken);

  return newTokens;
};

export const logout = async (tokenPayload) => {
  // await tokenRepo.create({
  //     tokenId: tokenPayload.jti,
  //     userId: tokenPayload.sub,
  //     expiresAt:tokenPayload.exp *1000
  // });
  await redisClient.set(`bl_${tokenPayload.jti}`, tokenPayload.jti, {
    EX: Math.floor(
      (new Date(tokenPayload.exp * 1000).getTime() - Date.now()) / 1000,
    ),
  });
};
async function googleVerifyToken(idToken) {
  const client = new OAuth2Client(
    "667195662834-3ge07g99nf6qhlq1t6vq3jqmnnnprujd.apps.googleusercontent.com",
  );
  const ticket = await client.verifyIdToken({ idToken });
  return ticket.getPayload;
}
export const loginWithGoogle = async (idToken) => {
  const payload = await googleVerifyToken({ idToken });
  if (!payload.email_verified) throw new BadRequestException("refused email");
  const user = await userRepo.getOne({ email: payload.email });
  if (!user) {
    const createdUser = await userRepo.create({
      email: payload.email,
      isEmailVerify: true,
      provider: "google",
    });
    const tokens = {
      accsessToken: createAccsessToken({
        sub: createdUser._id,
        userName: createdUser.userName,
        email: createdUser.email,
      }),
      refreshToken: createRefreshToken({
        sub: createdUser._id,
        userName: createdUser.userName,
        email: createdUser.email,
      }),
    };
    return tokens;
  }
  const tokens = {
    accsessToken: createAccsessToken({
      sub: user._id,
      userName: user.userName,
      email: user.email,
    }),
    refreshToken: createRefreshToken({
      sub: user._id,
      userName: user.userName,
      email: user.email,
    }),
  };
  return tokens;
};
