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
} from "../../common/index.js";
import { otpRepo, tokenRepo, userRepo } from "../../DB/index.js";
import { checkUserExist, createUser } from "../user/user.service.js";
import { loginValidation } from "./auth.validation.js";
export const sendOtp = async (body) => {
    const {email} = body
    const otpDoc = await otpRepo.getOne({email})
    if (otpDoc) throw new BadRequestException("you have allready otp")
    const otp = Math.floor(100000 + Math.random() * 900000);
    const createdOtp = await otpRepo.create({
      email: email,
      otp: otp,
      expiresAt: Date.now() + 1 * 60 * 1000,
    });
    sendEmail({
      to: email,
      subject: "verify your account",
      html: `<p>verify your account with this OTP ${otp}</p>`,
    });
}
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
  await sendOtp(body)
  return await createUser(body);
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
    accsessToken: createAccsessToken(userExist._id, userExist.userName, userExist.email),
    refreshToken: createRefreshToken(userExist._id, userExist.userName, userExist.email),
  };
  return tokens;
};

export const verifyAccount = async(body) => {
    const { otp, email } = body;
    const otpDoc = await otpRepo.getOne({ email })
    if (!otpDoc) throw new BadRequestException("expired otp !")
    if (otp != otpDoc.otp) {
        otpDoc.attempts += 1;
        if (otpDoc.attempts >= 3) {
            await otpRepo.deleteOne({email:email})
            throw new BadRequestException("to many tries")
        }
        await otpRepo.update({ email: email }, { attempts: otpDoc.attempts });
        throw new BadRequestException("Invalid otp ")
    }
    await userRepo.update({ email }, { isEmailVerify: true })
    await userRepo.deleteOne({_id : otpDoc._id})
    return true;
}
export const logOutFromAllDevices = async(user) => {
    await userRepo.update({ _id: user._id }, { cerdintialUpdatedAt: Date.now() });
    return true;
}

export const logout =async (tokenPayload,user) => {
    await tokenRepo.create({
        tokenId: tokenPayload.jti,
        userId: tokenPayload.sub,
        expiresAt:tokenPayload.exp *1000
    });
}