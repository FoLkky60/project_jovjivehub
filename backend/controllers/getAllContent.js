const Content = require('../models/contentData');
module.exports = async (req, res) => {

    try {
      const contents = await Content.find();
      res.status(200).json(contents);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching content', error: error.message });
    }
  };