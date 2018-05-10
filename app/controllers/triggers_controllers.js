var express = require("express");
var router = express.Router();
var db = require("../models");

// module.exports = function(router) { 
router.get("/", function(req, res) {
  res.redirect("/triggers");
})

// router to get contents of database to show onscreen
router.get("/triggers", function(req, res) {
  // express callback response by calling burger.findAll
  db.triggers.findAll()
  .then(function(allTriggers) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    var hbsObject = { triggers: allTriggers };
    res.render("index", hbsObject);
  });
});