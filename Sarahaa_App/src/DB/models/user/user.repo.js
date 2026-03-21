import { DBRepository } from "../../db.repository.js";
import { User } from "./user.model.js";
class userRepository extends DBRepository{
    constructor() {
        super(User)
    }
}
export const userRepo = new userRepository();