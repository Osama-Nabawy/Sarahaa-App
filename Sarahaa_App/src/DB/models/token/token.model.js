import { model, Schema,  SchemaTypes } from "mongoose";
const schema = new Schema({
    tokenId: {
      type:String
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required:true
    },
    expiresAt: {
        type: Date,
        index:{expires : 0}
  }
});

export const Token = model("Token",schema)