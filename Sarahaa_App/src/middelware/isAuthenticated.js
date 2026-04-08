import { BadRequestException, verifyAccsessToken } from "../common/index.js";
import { tokenRepo, userRepo } from "../DB/index.js";
import { redisClient } from "../DB/redis.connection.js";

export const isAuthenticated = async (req, res, next) => {
  const Authorization = req.headers.authorization;
  const payload = verifyAccsessToken(Authorization);
  if (!payload) throw new BadRequestException("feild token");
  const userExist = await userRepo.getOne({ _id: payload.sub });
  // console.log(userExist._id)
  if (!userExist) throw new BadRequestException("User not found");
  // console.log(new Date(userExist.cerdintialUpdatedAt).getTime , (payload.iat * 1000))
  if (new Date(userExist.cerdintialUpdatedAt).getTime() > payload.iat * 1000) {
    throw new BadRequestException("Invalid token");
  }
  // const tokenExist = await tokenRepo.getOne({ tokenId: payload.jti })
  const tokenExist = await redisClient.get(`bl_${payload.jti}`);
  if (tokenExist) throw new BadRequestException("revoked token");
  req.user = userExist;
  req.payload = payload;

  next();
};
