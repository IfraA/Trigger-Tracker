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
  if (userInfo.pollen) {
    userInfo.pollen = true;
  }
  if (userInfo.temperature) {
    userInfo.temperature = true;
  }
  if (userInfo.wind) {
    userInfo.wind = true;
  }
  if (userInfo.rain) {
    userInfo.rain = true;
  }
  if (userInfo.humidity) {
    userInfo.humidity = true;
  }
  if (userInfo.uvIndex) {
    userInfo.uvIndex = true;
  }
  if (userInfo.grass) {
    userInfo.grass = true;
  }
  if (userInfo.ragWeed) {
    userInfo.ragWeed = true;
  }
  if (userInfo.mold) {
    userInfo.mold = true;
  }

  db.Users.create(userInfo);
});

// router.get("/:id" function (req, res) {
//   var userTriggers = find(req.params.id);
//   res.render();
// });


router.post("/sign-in", function (req, res) {
  var userSignIn = req.body;
  console.log(userSignIn);
  function validate() {
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;
    if (userSignIn.email == "tgonzalez888@yahoo.com" && userSignIn.password == "Tony") {
      alert("Login successfull");
    }
      else {
        alert("Incorrect email or password, please try again");
    }
  }
});

module.exports = router;