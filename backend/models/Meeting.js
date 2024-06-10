const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDB' },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDB' },
  MeetdateTime: String,
  
});

module.exports = mongoose.model("MeetingEvent", MeetingSchema);
