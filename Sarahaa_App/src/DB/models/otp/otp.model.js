import { Schema, model } from "mongoose";
const schema = new Schema({
  email: {
    type: String,
    required: true, //ref:"User"
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    index: { expires: 0 },
  },
  attempts: {
    type: Number,
    default: 0,
  },
});

export const Otp = new model("Otp", schema);
