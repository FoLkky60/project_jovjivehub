const User = require("../models/User");

module.exports = (req, res) => {
  const { UID } = req.query;
  console.log(UID);

  User.findOne({ _id: UID })
    .then((user) => {
      if (user) {
        //   bcrypt
        //     .compare(password, user.password)
        //     .then((match) => {
        //       if (match) {
        //         // res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
        //         res.status(200).json({
        //           message: "Logged in successfully",
        //           userDate: user._id,
        //         });
        //         // res.cookie("myCookie", "cookieValue", {
        //         //   maxAge: 9000,
        //         //   httpOnly: true,
        //         // });
        //       } else {
        //         res.status(401).json({ message: "Incorrect password" });
        //       }
        //     })
        //     .catch((err) => {
        //       console.error("Error comparing passwords:", err);
        //       res.status(500).json({ message: "Internal server error" });
        //     });
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
