const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("./config/passport.config");
const api = require("./routes/api");
const app = express();

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* Database connection */
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Express Session
app.use(
  session({
    secret: "mySessionSecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/feisbuciuc_db",
    }),
    unset: "destroy",
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", api);
/**ROUTES **/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my app" });
});
//user login/registration
// Routes

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
