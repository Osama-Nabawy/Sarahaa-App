import { BadRequestException } from "../../common/index.js";
import { commentRepo } from "../../DB/index.js";

export const sendComment = async (
  content,
  file,
  r_id,
  senderId = undefined,
) => {
  if (file) {
    file = file.map((f) => f.path);
  }
  const createdComment = await commentRepo.create({
    content,
    file,
    r_id,
    sender: senderId,
  });
  return createdComment;
};

export const getSpecificComment = async (id, userId) => {
  const comment = await commentRepo.getOne(
    { _id: id, $or: [{ r_id: userId }, { sender: userId }] },
    {},
    { populate: [{ path: "r_id", select: "userName email" }] },
  );
  if (!comment) throw new BadRequestException("not found");
  return comment;
};
export const getAllComments = async (userId) => {
  const comment = await commentRepo.getAll(
    { $or: [{ r_id: userId }, { sender: userId }] },
    {},
    {
      limit: 10,
      populate: [{ path: "r_id", select: "userName email" }],
    },
  );
  if (!comment) throw new BadRequestException("not found any comment yet");
  return comment;
};
