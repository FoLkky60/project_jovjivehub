const Content = require("../models/contentData");

module.exports = async (req, res) => {
  try {

    const contents = await Content.find({}).populate('OnwerId');
    // console.log('C',contents);
    res.status(200).json(contents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching content", error: error.message });
  }
};
