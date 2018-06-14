var math = require("mathjs");
var regression = require("regression");
var exports = (module.exports = {});
//var userdata = require("../models/userdata.js")
var models = require("../models");
exports.index = function(req, res) {
  res.render("index");
};

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.dashboard = function(req, res) {
  console.log(req.user.firstname);
  models.userdata
    .findAll({
      where: {
        username: req.user.email
      }
    })
  //models.userdata.findAll({Attributes: [req.user.email, 'tableNAme'], group: ['tableName']})
    .then(function(data) {
      //console.log(data[0].tableName)
      var tableList = []
      data.forEach(element => {
        console.log("---------------------------------------------------------------",element.tableName)
        if (tableList.indexOf(element.tableName) == -1){tableList.push(element.tableName)}else{ }
      });
      console.log(tableList)
      if (data[0] != undefined) {
        res.render("dashboard", { name: req.user.firstname, tableList: tableList });
      } else {
        res.render("dashboard", { name: req.user.firstname, tableList: [""] });
      }
    });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};

exports.newTable = function(req, res) {
  console.log(req.body);
  res.redirect("/");
};

exports.help = function(req, res) {
  res.render("help");
};

exports.settings = function(req, res) {
  res.render("settings");
};

// exports.table = function(req, res) {
//   console.log("Params",req.params);
//   models.userdata
//     .findAll({
//       where: {
//         username: req.user.email,
//         tableName: "Example"
//       }
//     })
//     .then(function(data) {
//       let average = array => array.reduce((a, b) => a + b) / array.length;
//       var pairs = [];
//       var tableName = data[0].tableName;
//       var xName = data[0].dataValues.xName;
//       var yName = data[0].dataValues.yName;
//       var xValues = [];
//       var yValues = [];
//       var pXValues = [];
//       var pLYValues = [];
//       var pPYValues = [];
//       var mean;
//       var max;
//       var min;
//       var sd;
//       var pv;

//       for (let i = 0; i < data.length; i++) {
//         xValues.push(parseFloat(data[i].dataValues.xValue));
//         yValues.push(parseFloat(data[i].dataValues.yValue));
//         pairs.push([data[i].dataValues.xValue, data[i].dataValues.yValue]);
//       }

//       mean = math.mean(yValues);
//       max = math.max(yValues);
//       min = math.min(yValues);
//       sd = math.std(yValues);
      
      
//       pvl = regression.linear(pairs, { order: 1, precision: 2 });
//       pvp = regression.polynomial(pairs, { order: xValues.length/2 });
//       for (let i = 0; i <= xValues[xValues.length - 1] + 1.2; i += 0.2) {
//         pXValues.push(i);
//         pLYValues.push(pvl.predict(i)[1]);
//         pPYValues.push(pvp.predict(i)[1]);
//         console.log(pvl.predict(i));
//       }
//       console.log(pvl.predict(4)[0]);
//       res.render("table", {
//         data: data,
//         tableName: tableName,
//         xName: xName,
//         yName: yName,
//         xValues: xValues,
//         yValues: yValues,
//         mean: mean,
//         max: max,
//         min: min,
//         sd: sd,
//         linearEquation: pvl.string,
//         polynomialEquation: pvp.string,
//         pXValues: pXValues,
//         pLYValues: pLYValues,
//         pPYValues: pPYValues
//       });
//     });
// };
