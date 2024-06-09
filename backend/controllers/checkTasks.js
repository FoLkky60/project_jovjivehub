const nodemailer = require("nodemailer");
const User = require("../models/User");
const { google } = require("googleapis");

const CLIENT_ID =
  "964284001470-nshmrb7jmmqfqkfqu90spb7tucqmad0k.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04AZM1IOs5KA9CgYIARAAGAQSNwF-L9IrL6iX-6rB3HUtJO_4iPvLGLRZYHkGCgvRIRipWRHVOM_aa9LosaOdQAd1ok2JHTk9KA8";
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
module.exports = async (req, res) => {
  const { userId, incompleteDays } = req.body;
  console.log(userId);
  if (incompleteDays >= 3) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      try {
        console.log("Sending email to:", user);
        await sendEmail(user.email);

        return res.status(200).json({ message: "Notification sent" });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      }
    }
  }

  res.status(200).json({ message: "No notification needed" });
};

// Function to send email
const sendEmail = async (to) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "puchit.ket@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const mailOptions = {
    from: "p.tranf@gmail.com",
    to,
    subject: "Task Completion Reminder",
    text: "You have not completed all tasks for the past three days. Please ensure to complete your tasks.",
  };

  await transporter.sendMail(mailOptions);
};
