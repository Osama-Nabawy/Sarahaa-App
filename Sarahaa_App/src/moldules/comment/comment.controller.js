import { Router } from "express";
import { commentRepo } from "../../DB/index.js";
import {
  getAllComments,
  getSpecificComment,
  sendComment,
} from "./comment.service.js";
import { fileUpload } from "../../common/utils/multer.js";
import { fileValidation } from "../../middelware/file.validation.js";
import { isAuthenticated } from "../../middelware/isAuthenticated.js";

const router = Router();

router.post(
  "/:r_id/anomuyns",
  fileUpload().array("file", 2),
  async (req, res, next) => {
    const { content } = req.body;
    const { r_id } = req.params;
    const files = req.files;
    const createdComment = await sendComment(content, files, r_id);
    return res
      .status(201)
      .json({ msg: "Created Succssfully", data: { createdComment } });
  },
);

router.post(
  "/:r_id",
  isAuthenticated,
  fileUpload().array("file", 2),
  async (req, res, next) => {
    const { content } = req.body;
    const { r_id } = req.params;
    const files = req.files;
    const createdComment = await sendComment(
      content,
      files,
      r_id,
      req.user._id,
    );
    return res
      .status(201)
      .json({ msg: "Created Succssfully", data: { createdComment } });
  },
);

router.get("/get-specific/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const massage = await getSpecificComment(id, req.user._id);
  return res.status(200).json({
    msg: "massage found",
    data: { massage },
  });
});
router.get("/get-all", isAuthenticated, async (req, res, next) => {
  const massage = await getAllComments(req.user._id);
  return res.status(200).json({
    msg: "massage found",
    data: { massage },
  });
});

export const commentRouter = router;
