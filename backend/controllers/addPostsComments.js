const Post = require("../models/Post");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  try {
    const post = await Post.findById(id);
    post.comments.push({ text, author });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send(err);
  }
};
