//get route from dbm

var express = require("express");
var router = express.Router();
var db = require("../models");

// module.exports = function(router) { 
router.get("/", function (req, res) {
  res.redirect("/triggers");
})

// router to get contents of database to show onscreen
router.get("/triggers/", function (req, res) {
  db.Users.findAll()
    .then(function (allTriggers) {
      var hbsObject = { triggers: allTriggers };
      res.render("index", hbsObject);
    });
});


router.post("/sign-up", function (req, res) {
  
  var userInfo = req.body;
  console.log(userInfo)
  //Create new user with info
  // Triggers set are coming back as 'on', triggers not set dont come in.
  /*
  { email: 'yubhv@aol.com',
  password: '1234',
  firstName: 'TOny',
  lastName: 'gonzalez',
  pollen: 'on' }
  */
 
  // We have 3 triggers (pollen, smoke, smog)
  // if pollen exists on userInfo, set it's value to true
  if (userInfo.pollen) {
    userInfo.pollen = true;
  }
  if (userInfo.smoke) {
    userInfo.smoke = true;
  }
  if (userInfo.smog) {
    userInfo.smog = true;
  }


  db.Users.create(userInfo)

  // triggers.create(
  //   ["email, passwords, firstName, lastName",],
  //   [req.body.email, req.body.passwords, req.body.firstName, req.body.lastName], function () {
  //   res.redirect("/");
  // });
});


module.exports = router;