const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const storeUserController = require("./controllers/stroreUsercontroller");
const loginUserController = require("./controllers/loginUserController");
const addContent = require("./controllers/addContent");

const getAllContent = require("./controllers/getAllContent");
const getPostDataByID = require("./controllers/getPostDataByID");
const getUserDataByID = require("./controllers/getUserDataByID");
const postTask = require("./controllers/postTask");
const getTaskByID = require("./controllers/getTaskByID");
const getAllPost = require("./controllers/getAllPost.js");
const addPosts = require("./controllers/addPosts.js");
const addPostsComments =require("./controllers/addPostsComments.js");

const PORT = 5000;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://mayoi:Puchit4826@cluster0.pyaz4rl.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Added for avoiding deprecation warning
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.post("/api/register", storeUserController);
app.post("/api/login", loginUserController);
app.post(
  "/content",
  upload.fields([{ name: "thumbnail" }, { name: "channelLogo" }]),
  addContent
);
app.post("/tasks", postTask);
app.post("/api/posts", addPosts);
app.post('/api/posts/:id/comments',addPostsComments)
// Uncomment and define the route if needed

app.get("/api/getUserDataByID", getUserDataByID);
app.get("/api/getAllContent", getAllContent);
app.get("/api/getPostDataByID", getPostDataByID);
app.get("/api/tasks/:userId/:date", getTaskByID);
app.get("/api/getAllposts", getAllPost);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
