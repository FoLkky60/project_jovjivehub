const ContentComment = require("../models/ContentComment");

module.exports = async (req, res) => {
    const { postId } = req.query;
    const comments = await ContentComment.find({ postId }).populate("userId").sort({ timestamp: 1 });
    // console.log(comments);
    res.status(200).json(comments);
  }