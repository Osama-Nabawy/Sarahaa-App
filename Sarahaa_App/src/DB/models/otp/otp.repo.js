import { DBRepository } from "../../db.repository.js";
import { Otp } from "./otp.model.js";

class OtpRepo extends DBRepository{
    constructor() {
        super(Otp)
    }
}
export const otpRepo = new OtpRepo();