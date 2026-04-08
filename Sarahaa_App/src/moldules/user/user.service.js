import { BadRequestException } from "../../common/index.js";
import { userRepo } from "../../DB/index.js";
export const checkUserExist = async (data) => {
  return await userRepo.getOne(data);
};

export const createUser = async (data) => {
  return await userRepo.create(data);
};
export const uploadProfilePictuer = async (user, file) => {
  const userUpdated = await userRepo.update(
    { _id: user._id },
    { pp: file.path },
  );
  if (!userUpdated) throw new BadRequestException("User Not Found");
  return userUpdated;
};
