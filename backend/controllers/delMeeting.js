const Meeting = require("../models/Meeting");

module.exports = async (req, res) => {
  const { postId, memberId } = req.body;
  try {
    await Meeting.deleteMany({ postId, memberId });
    res.json(Meeting);
  } catch (err) {
    res.status(500).send(err);
  }
};
