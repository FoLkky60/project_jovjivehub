const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");

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
const addPostsComments = require("./controllers/addPostsComments.js");
const addMeeting = require("./controllers/addMeeting.js");
const toggleLike = require("./controllers/toggleLike.js");
const getUserLikes = require("./controllers/getUserLikes.js");
const getUserMeeting = require("./controllers/getUserMeeting.js");
const checkTasks = require("./controllers/checkTasks.js");
const addContentComment = require("./controllers/addContentComment.js");
const saveUserLocation = require("./controllers/saveUserLocation.js");
const getOtherUsersLocations = require("./controllers/getOtherUsersLocations.js");
const getContentCommentByPost = require("./controllers/getContentCommentByPost.js");
const CustTask = require('./models/CustTask');

const {
  updateUsername,
  updateProfilePic,
} = require("./controllers/updateUserController.js");

const delMeeting = require("./controllers/delMeeting.js");

const PORT = 5001;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(cors());

// const corsOptions = {
//   origin: 'https://localhost:5173/',
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
// Enable CORS for all origins
app.use(cors());

// If you want to allow requests from specific origins:
// Replace 'https://localhost:5173' with your desired origin
app.use(
  cors({
    origin: "https://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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
app.post("/api/posts/:id/comments", addPostsComments);
app.post('/api/addContentComment', addContentComment);
app.post("/api/posts/:id/joins", addMeeting);
app.post("/api/posts/:id/joins/del", delMeeting);
app.post("/api/saveUserLocation", saveUserLocation);
app.post("/api/posts/:postId/toggleLike", toggleLike);
app.post("/api/checkTasks", checkTasks);
// Uncomment and define the route if needed

app.post("/api/updateUsername", updateUsername);
app.post(
  "/api/updateProfilePic",
  upload.fields([{ name: "profilePic" }]),
  updateProfilePic
);

app.post('/api/customTasks', async (req, res) => {
  const { userId, date, tasks } = req.body;
  try {
    let custTask = await CustTask.findOne({ userId, date });
    if (custTask) {
      custTask.tasks = tasks;
    } else {
      custTask = new CustTask({ userId, date, tasks });
    }
    await custTask.save();
    res.status(200).json(custTask);
  } catch (error) {
    res.status(500).json({ error: 'Error saving custom tasks' });
  }
});

// Fetch custom tasks
app.get('/api/customTasks/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  try {
    const custTask = await CustTask.findOne({ userId, date });
    res.status(200).json(custTask);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching custom tasks' });
  }
});


app.get("/api/getOtherUsersLocations", getOtherUsersLocations);
app.get("/api/getUserDataByID", getUserDataByID);
app.get("/api/getAllContent", getAllContent);
app.get("/api/getPostDataByID", getPostDataByID);
app.get("/api/tasks/:userId/:date", getTaskByID);
app.get("/api/getAllposts", getAllPost);
app.get("/api/getUserLikes", getUserLikes);
app.get("/api/getUserMeeting", getUserMeeting);
app.get('/api/getContentCommentByPost', getContentCommentByPost);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
