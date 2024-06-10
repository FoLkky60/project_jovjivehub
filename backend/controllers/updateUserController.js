const User = require("../models/User");
function reformatPath(path) {
  // Replace the first occurrence of "..\public" with "."
  let reformattedPath = path.replace("..\\public", "");

  // Replace any remaining backslashes with forward slashes
  reformattedPath = reformattedPath.replace(/\\/g, "/");

  return reformattedPath;
}

const updateUsername = async (req, res) => {
  const { uid, newUsername } = req.body;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    await user.save();
    res.status(200).json({ message: "Username updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating username", error });
  }
};
const updateProfilePic = async (req, res) => {
  const { uid } = req.body;

  // Ensure that the file is uploaded and accessible
  if (
    !req.files ||
    !req.files.profilePic ||
    req.files.profilePic.length === 0
  ) {
    return res.status(400).json({ message: "No profile picture uploaded" });
  }

  // Assuming reformatPath is a function that formats the file path correctly
  const profilePic = reformatPath(req.files.profilePic[0].path);

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the current state of the user object
    console.log("Current user data:", user);

    // Update only the profilePic field
    user.profilePic = profilePic;

    // Save the user
    await user.save();

    res
      .status(200)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Error updating profile picture", error });
  }
};

module.exports = {
  updateUsername,
  updateProfilePic,
};
