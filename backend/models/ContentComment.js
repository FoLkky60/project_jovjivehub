const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDB" },
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
