const ContentComment = require("../models/ContentComment");

module.exports = async (req, res) => {
  const { postId, userId, text } = req.body;
  const comment = new ContentComment({ postId, userId,  text });
  await comment.save();
  res.status(201).json(comment);
};