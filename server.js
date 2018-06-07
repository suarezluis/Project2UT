var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3310;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.get('/', function(req, res){
//   res.send('Welcome to Passport with Sequelize');
// });

//Models
var models = require("./app/models");

//Routes
var authRoute = require("./app/routes/auth.js")(app, passport);

//load passport strategies
require("./app/config/passport/passport.js")(passport, models.user);

//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
    app.listen(PORT, function() {
      // Log (server-side) when our server has started
      console.log("Server listening on: http://localhost:" + PORT);
    });
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });


