require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session);
const guestRoute = require("./routes/guestRoute");
const adminRoute = require("./routes/adminRoute");
const hospitalRoute = require("./routes/hospitalRoute");
const patientRoute = require("./routes/patientRoute");
const sessionHandler = require("./middleware/session");
const auth = require("./middleware/authentication");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

const app = express();

const PORT = "6969";

app.use('/public', express.static('public'));
// app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Session
const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "sessions"
})

app.use(session({
  secret: 'healthUS',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected to database successfully");
});

// // get username middleware
// app.use(sessionHandler.getUsername)

// Routes
app.use("/", guestRoute);


app.use("/", patientRoute);
// app.use("/admin", auth.adminAuth, adminRoute);

// Session timeout
// app.use(sessionHandler.checkSessionTimeout);
// app.use(sessionHandler.lastActive);

app.use("/admin", adminRoute);
app.use("/hospital", hospitalRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
