const Post = require('../models/Post');
module.exports = async (req, res) => {
    try {
      const contents = await Post.find();
      res.status(200).json(contents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
  };