import { model, Schema } from "mongoose";
import { SYS_Gender } from "../../../common/index.js";

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: function () {
        if (this.phoneNumber) return false;
        return true;
      },
      trim: true,
      lowercase: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["google", "system"],
      default: "system",
    },
    password: {
      type: String,
      required: function () {
        if (this.provider == "google") return false;
        return true;
      },
      minlength: 8,
    },
    phonenumber: {
      type: String,
      required: function () {
        if (this.email) return false;
        return true;
      },
    },
    gender: {
      type: Number,
      enum: Object.values(SYS_Gender),
      default: SYS_Gender.male,
    },
    pp: {
      type: String,
      required: false,
    },
    isEmailVerify: {
      type: Boolean,
      default: false,
    },
    cerdintialUpdatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  },
);
export const User = new model("User", schema);
