import { model, Schema } from "mongoose"
const schema = new Schema({
  content: {
    type: String,
    required: function () {
      if (this.file) return false;
      return true;
    },
  },
  file: {
    type: String,
    required: function () {
      if (this.content) return false;
      return true;
    },
  },
  r_id: {type: Number, required: true, ref: "User" },
});
export const Comment = new model("Comment", schema);