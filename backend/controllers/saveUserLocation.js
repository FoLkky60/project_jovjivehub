const Room = require("../models/Room");

module.exports = async (req, res) => {
  const { userId, latitude, longitude, roomId } = req.body;
  try {
    await Room.findOneAndUpdate(
      { memberId: userId, roomId }, // Query to find the existing document
      { location: { latitude, longitude } }, // Data to update
      { upsert: true, new: true, setDefaultsOnInsert: true } // Options
    );
    res.status(200).send("Location saved or updated successfully");
  } catch (error) {
    console.error("Error saving or updating user location:", error);
    res.status(500).send("Internal Server Error");
  }
};
