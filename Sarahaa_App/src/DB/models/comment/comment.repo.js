import { DBRepository } from "../../db.repository.js";
import { Comment } from "./comment.model.js";
class CommentRepo extends DBRepository {
  constructor() {
    super(Comment);
  }
}
export const commentRepo = new CommentRepo();
