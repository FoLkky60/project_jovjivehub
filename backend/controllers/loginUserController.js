const bcrypt = require("bcrypt");
const User = require("../models/User");
const cookieParser = require("cookie-parser");

module.exports = async ( req, res) => {
  const { email, password } = req.body;
    console.log(req.body);

  await User.findOne({ email: email })
    .then(async (user) =>  {
      if (user) {
        
        // const salt = await bcrypt.genSalt(10); 
        // const hash = await bcrypt.hash(password, salt);
        // console.log(hash);
        // await console.log(user.password);
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              console.log('macthed');
              // res.setHeader("Access-Control-Allow-Origin", "https://localhost:5173");
              res.status(200).json({
                message: "Logged in successfully",
                userDate: user._id,
              });

            } else {
              console.log('Not macthed');
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
