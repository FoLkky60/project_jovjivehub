const Post = require('../models/Post');

module.exports = async (req, res) => {
    const { text, author, authorId,profilePic, dateTime } = req.body;
    const newPost = new Post({ text, author, profilePic,authorId, dateTime });
    try {
        await newPost.save();
        res.json(newPost);
    } catch (err) {
        res.status(500).send(err);
    }
};
const Post = require('../models/Post');

module.exports = async (req, res) => {
    const { text, author, profilePic, dateTime } = req.body;
    const newPost = new Post({ text, author, profilePic, dateTime });
    try {
        await newPost.save();
        res.json(newPost);
    } catch (err) {
        res.status(500).send(err);
    }
};