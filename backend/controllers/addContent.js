
const Content = require('../models/contentData');
function reformatPath(path) {
    // Replace the first occurrence of "..\public" with "."
    let reformattedPath = path.replace("..\\public", "");
  
    // Replace any remaining backslashes with forward slashes
    reformattedPath = reformattedPath.replace(/\\/g, "/");
  
    return reformattedPath;
  }
  
module.exports = async (req, res) => {
    try {
        const { liveName, creatorName, viewers } = req.body;

        const thumbnail = req.files['thumbnail'] ? reformatPath(req.files['thumbnail'][0].path ): undefined;
        const channelLogo = req.files['channelLogo'] ? reformatPath(req.files['channelLogo'][0].path) : undefined;
        
        // Create a new Content document
        const newContent = new Content({
          liveName,
          creatorName,
          viewers: parseInt(viewers, 10),
          thumbnail,
          channelLogo
        });
    
        // Save the document to the database
        await newContent.save();
    
        res.status(201).json({ message: 'Content created successfully', content: newContent });
      } catch (error) {
        res.status(500).json({ message: 'Error creating content', error });
      }
  };
