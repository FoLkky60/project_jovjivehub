const Meeting = require("../models/Meeting");

module.exports = async (req, res) => {
  const { postId, hostId, memberId, MeetdateTime } = req.body;
  console.log(req.body);
  const newMeeting = new Meeting({ postId, hostId, memberId, MeetdateTime });
  try {
    await newMeeting.save();
    res.json(newMeeting);
  } catch (err) {
    res.status(500).send(err);
  }
};
