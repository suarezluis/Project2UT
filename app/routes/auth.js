var authController = require("../controllers/authcontroller.js");
var models = require("../models");
var math = require("mathjs");
var regression = require("regression");
var exphbs = require("express-handlebars");
module.exports = function(app, passport) {
  app.get("/", authController.index);

  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  app.get("/help", authController.help);

  app.get("/settings", isLoggedIn, authController.settings);

  app.get("/table/:table", function(req, res) {
    
    var condition = req.params.table;
  console.log("table:",condition)
  console.log(req.user.email)
  console.log("Params",req.params);
  models.userdata
    .findAll({
      where: {
        username: req.user.email,
        tableName: req.params.table
      }
    })
    .then(function(data) {
      console.log("data",data)
      let average = array => array.reduce((a, b) => a + b) / array.length;
      var pairs = [];
      var tableName = data[0].tableName;
      var xName = data[0].dataValues.xName;
      var yName = data[0].dataValues.yName;
      var xValues = [];
      var yValues = [];
      var pXValues = [];
      var pLYValues = [];
      var pPYValues = [];
      var mean;
      var max;
      var min;
      var sd;
      var pv;

      for (let i = 0; i < data.length; i++) {
        xValues.push(parseFloat(data[i].dataValues.xValue));
        yValues.push(parseFloat(data[i].dataValues.yValue));
        pairs.push([data[i].dataValues.xValue, data[i].dataValues.yValue]);
      }

      mean = math.mean(yValues);
      max = math.max(yValues);
      min = math.min(yValues);
      sd = math.std(yValues);
      
      
      pvl = regression.exponential(pairs,);
      pvp = regression.polynomial(pairs, { order: xValues.length/2 });
      for (let i = 0; i <= xValues[xValues.length - 1] + 1.2; i += 0.2) {
        pXValues.push(i);
        pLYValues.push(pvl.predict(i)[1]);
        pPYValues.push(pvp.predict(i)[1]);
        console.log(pvl.predict(i));
      }
      console.log(pvl.predict(4)[0]);
      res.render("table", {
        data: data,
        tableName: tableName,
        xName: xName,
        yName: yName,
        xValues: xValues,
        yValues: yValues,
        mean: mean,
        max: max,
        min: min,
        sd: sd,
        linearEquation: pvl.string,
        polynomialEquation: pvp.string,
        pXValues: pXValues,
        pLYValues: pLYValues,
        pPYValues: pPYValues
      });
    });
  },isLoggedIn, authController.signin);


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
