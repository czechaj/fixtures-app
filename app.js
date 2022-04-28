const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config();

const pageRoutes = require("./routes/pageRoutes");
const userRoutes = require("./routes/userRoutes");
const furnitureRoutes = require("./routes/furnitureRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app = express();
// template engine
app.set("view engine", "ejs");

// connecting db
mongoose.connect(`mongodb+srv://czechaj:${process.env.DB_KEY}@cluster0.q16jy.mongodb.net/fixtures-app?retryWrites=true&w=majority`, () => {
  console.log("db connected");
});

// global variable
global.userIn = null;

// middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.use(
  session({
    secret: "scmalkmkmdls838bshjabd7",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:`mongodb+srv://czechaj:${process.env.DB_KEY}@cluster0.q16jy.mongodb.net/fixtures-app?retryWrites=true&w=majority`,
    }),
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// routes
app.use("/", pageRoutes);
app.use("/users", userRoutes);
app.use("/furnitures", furnitureRoutes);
app.use("/categories", categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}! `);
});
