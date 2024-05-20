const User = require("../models/User");

module.exports = (req, res) => {
  const { UID } = req.query;
  console.log(UID);

  User.findOne({ _id: UID })
    .then((user) => {
      if (user) {
        res.status(200).json({
          userDate: user,
        });
      } else {
        res.status(404).json({ message: "User with this email not found" });
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};
