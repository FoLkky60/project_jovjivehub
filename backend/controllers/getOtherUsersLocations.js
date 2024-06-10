const Room = require("../models/Room");

module.exports = async (req, res) => {
  const { roomId } = req.query;
  try {
    const usersInRoom = await Room.find({ roomId }).populate(
      "memberId",
    );
    // console.log("users in room:", usersInRoom);
    res.status(200).json({ users: usersInRoom });
  } catch (error) {
    console.error("Error fetching other users' locations:", error);
    res.status(500).send("Internal Server Error");
  }
};
