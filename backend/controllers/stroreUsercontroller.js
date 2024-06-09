const User = require("../models/User");

module.exports = async (req, res) => {
  console.log(req.body);
  const existingUserByEmail = await User.findOne({ email: req.body.email });
  const existingUserByUsername = await User.findOne({
    username: req.body.username,
  });

  if (existingUserByEmail) {
    throw new Error("this email already exists");
  }

  if (existingUserByUsername) {
    throw new Error("this username already exists");
  }
  User.create(req.body)
    .then(async () => {
      console.log("Success Register");
      res.status(201).json({ message: "User registered successfully" });
    })
    .catch((error) => {
      console.log("Error Register");

      if (error) {
        console.log(error.message);
        return res.status(409).json({ message: "Email already exists" });
        // const validationErrors = error.message;
        // req.flash("validationErrors", validationErrors);
        // req.flash("data", req.body);
        // return res.redirect("/login_or_register");
      }
    });
};
