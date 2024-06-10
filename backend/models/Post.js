const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: String,
  author: String,
  authorId: String,
  profilePic: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserDBs" }],
  comments: [
    {
      text: String,
      author: String,
      commentDate: { type: Date, default: Date.now },
    },
  ],
  dateTime: String,
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
