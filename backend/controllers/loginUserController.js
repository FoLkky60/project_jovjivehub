const bcrypt = require("bcrypt");
const User = require("../models/User");
const cookieParser = require("cookie-parser");

module.exports = (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              // res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
              res.status(200).json({
                message: "Logged in successfully",
                userDate: user._id,
              });
              // res.cookie("myCookie", "cookieValue", {
              //   maxAge: 9000,
              //   httpOnly: true,
              // });
            } else {
              res.status(401).json({ message: "Incorrect password" });
            }
          })
          .catch((err) => {
            console.error("Error comparing passwords:", err);
            res.status(500).json({ message: "Internal server error" });
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
