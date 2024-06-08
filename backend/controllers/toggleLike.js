const Post = require("../models/Post");

module.exports = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    console.log(userId);
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure the likes array exists
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    // Toggle the like
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }
    console.log(post.likes);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
