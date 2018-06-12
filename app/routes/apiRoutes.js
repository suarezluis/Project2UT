var db = require("../models")
var models = require("../models");
var math = require("mathjs");
var regression = require("regression");
module.exports = function(app) {
    
    app.post("/newTable", function(req, res) {
    console.log(req.body)
    console.log(req.user.email)
    var newJSON = req.body;
    newJSON.username = req.user.email;
          db.userdata.create(newJSON).then(function(dbAuthor) {
        res.redirect("/dashboard");
      });
    });
  
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
        pvp = regression.polynomial(pairs, { order: xValues.length });
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
    });
  

    app.post("/newValue/:tableName/:xName/:yName", function(req, res) {
      console.log("--------------------------------------> REQ:",req.params.tableName)
      console.log("--------------------------------------> REQ:",req.params.xName)
      console.log("--------------------------------------> REQ:",req.params.yName)
      console.log(req.body)
      console.log("x",req.body.xValue)
      console.log("y",req.body.yValue)
      console.log(req.user.email)
      var newJSON = req.body;
      newJSON.username = req.user.email;
      newJSON.tableName = req.params.tableName;
      newJSON.xName = req.params.xName;
      newJSON.yName = req.params.yName;
      console.log(newJSON)
             db.userdata.create(newJSON).then(function(dbAuthor) {
           res.redirect("/table/"+req.params.tableName);
         });
      });


  };