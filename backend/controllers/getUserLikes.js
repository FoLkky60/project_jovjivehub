const Post = require("../models/Post");
const Meeting = require("../models/Meeting");

module.exports = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  try {
    const likes = await Post.find({ likes: userId }).select("_id");
    // const postbyid = await Meeting.find({ postId: likes }).populate("postId");
    // console.log("postbyid", );
    // res.json(likes.length === 0 ? 'You don\'t have any )like':likes);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
