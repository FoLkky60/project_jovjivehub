const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "UserDB" },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  roomId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
