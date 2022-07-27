const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

global.loggedIn = false;
global.userType = "";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const LoginView = require("./controllers/LoginViewController");
const LogoutView = require("./controllers/LogoutViewController");
const RegisterView = require("./controllers/RegisterViewController");
const GTestView = require("./controllers/GTestViewController");
const G2TestView = require("./controllers/G2TestViewController");
const DashboardView = require("./controllers/DashboardViewController");
const IndexView = require("./controllers/IndexViewController");
const RegisterController = require("./controllers/RegisterController");
const LoginController = require("./controllers/LoginController");
const G2TestController = require("./controllers/G2TestController");
const AppointmentView = require("./controllers/AppointmentViewController");
const AppointmentFetchController = require("./controllers/AppointmentFetchController");
const AuthMiddleware = require("./middleware/AuthFilter");

mongoose.connect(
  "mongodb+srv://fullstackp:qEteQu72of0mSMMx@cluster0.2w7svte.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

app.use(
  session({
    secret: "abcd1234",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use("*", (req, res, next) => {
  loggedIn = req.session.user !== undefined;
  userType = req.session.userType;
  next();
}); // this is to check if the user is logged in or not

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Listening on port 3000");
  console.log("Application running on http://localhost:3000");
});

//HTML pages Views
app.get("/", IndexView);
app.get("/login", LoginView);
app.get("/logout", LogoutView);
app.get("/signup", RegisterView);
app.get("/dashboard", AuthMiddleware, DashboardView);
app.get("/g", AuthMiddleware, GTestView);
app.get("/g2", AuthMiddleware, G2TestView);
app.get("/appointment", AuthMiddleware, AppointmentView);

//APIs (Form Data)
app.post("/register", RegisterController);
app.post("/authenticate", LoginController);
app.post("/update", AuthMiddleware, G2TestController);
app.post("/fetch", AuthMiddleware, AppointmentFetchController);
