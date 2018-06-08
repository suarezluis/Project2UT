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
  models.userdata.findAll({
	  where:{
		  username: req.user.email
	  }
  }).then(function(data){
	//console.log(data[0].tableName)
  
  if(data[0] != undefined){
  
  res.render("dashboard", { name: req.user.firstname, tableList: data });
  } 

  else{
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
