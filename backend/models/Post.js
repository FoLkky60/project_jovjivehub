const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: String,
  author: String,
  profilePic: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String, author: String }],
  dateTime: String,
});

module.exports = mongoose.model("Post", postSchema);
