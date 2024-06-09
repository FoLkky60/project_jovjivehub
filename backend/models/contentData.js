const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  thumbnail: {
    type: String,
    default: "/imges/prof.png",
  },
  channelLogo: {
    type: String,
    default: "/imges/4.jpg",
  },
  liveName: {
    type: String,
  },
  creatorName: {
    type: String,
  },
  viewers: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("Content", ContentSchema);
