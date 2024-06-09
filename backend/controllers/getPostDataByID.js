const Content = require("../models/contentData");
module.exports = async (req, res) => {
  try {
    const { pid } = req.query;
    // console.log(pid);
    Content.findOne({ _id: pid }).populate('OnwerId')
      .then((content) => {
        // console.log("content", content);
        if (content) {
          res.status(200).json({
            postData: content
          });
        } else {
          res.status(404).json({ message: "User with this email not found" });
        }
      })
      .catch((err) => {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching content", error: error.message });
  }
};
