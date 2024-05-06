const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require('cors');
const stroreUsercontroller = require('./controllers/stroreUsercontroller')



const PORT = 5000;

app.use(bodyParser.json());


mongoose.connect(
  "mongodb+srv://mayoi:Puchit4826@cluster0.pyaz4rl.mongodb.net/yourDatabaseNameHere?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Added for avoiding deprecation warning
  }
).then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.error("Error connecting to database:", err);
});


// Mock user database
const users = {};
app.use(cors());
// app.post('/api/register', (req, res) => {
//   const { username, email, password } = req.body;
//   if (users[email]) {
//     return res.status(409).json({ message: 'Email already exists' });
//   }
//   // Here, you should add hashing to the password before storing it
//   users[email] = { username, email, password };
//   res.status(201).json({ message: 'User registered successfully' });
// });

app.post('/api/register', stroreUsercontroller);

// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = users[email];
// console.log(user);
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   if (user.password !== password) { // In real applications, use hashed password comparison
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   res.status(200).json({ message: 'Logged in successfully' });
// });

// app.post('/api/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = users[email];
// console.log(user);
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   if (user.password !== password) { // In real applications, use hashed password comparison
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   res.status(200).json({ message: 'Logged in successfully' });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});