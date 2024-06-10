const Content = require("../models/contentData");

module.exports = async (req, res) => {
  const { roomId, userId } = req.body;
  try {
    
    const Meeting = await Content.deleteOne({ _id:roomId });
    console.log(Meeting);
    // await Meeting.deleteMany({ postId, memberId });
    res.json(Meeting);
  } catch (err) {
    res.status(500).send(err);
  }
};