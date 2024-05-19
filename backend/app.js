const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const storeUserController = require("./controllers/stroreUsercontroller");
const loginUserController = require("./controllers/loginUserController");
const getUserDataByID = require("./controllers/getUserDataByID");

const PORT = 5000;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

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

// Uncomment and define the route if needed
app.get('/api/getUserDataByID', getUserDataByID);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
