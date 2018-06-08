var db = require("../models")
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
  
    
  
  };