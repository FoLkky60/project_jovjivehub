const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Plase Enter Username "],
  },
  email: {
    type: String,
    required: [true, "Plase Enter Email"],
  },
  password: {
    type: String,
    required: [true, "Plase Enter pasword "],
  },
  profilePic: {
    type: String,
    default: "/imges/4.jpg",
  },
  birthday: {
    type: Date,
  },
});

// Hashing the password before saving it to the database
UserSchema.pre("save", async function (next) {
  const user = this;
  try {


    const salt = await bcrypt.genSalt(10); // Added the salt value for password hashing
    const hash = await bcrypt.hash(user.password, salt); // Hashing the password with the provided salt
    user.password = hash;
    next();
  } catch (error) {
    // console.error(error); // Handling error by logging it to the console
    throw error; // Rethrow the error to notify the caller about the failure
  }
});

const User = mongoose.model("UserDB", UserSchema);
module.exports = User;
