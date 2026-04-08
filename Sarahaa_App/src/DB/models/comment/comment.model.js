import { SchemaTypes } from "mongoose";
import { model, Schema } from "mongoose";
const schema = new Schema({
  content: {
    type: String,
    required: function () {
      if (this.file.length == 0) return true;
      return false;
    },
  },
  file: {
    type: [String],
  },
  r_id: { type: SchemaTypes.ObjectId, required: true, ref: "User" },
  sender: { type: SchemaTypes.ObjectId, required: false, ref: "User" },
});
export const Comment = new model("Comment", schema);
