// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./app/models");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("app/public"));


app.get('/triggers', function (req, res) {
  db.Triggers.findAll({}).then(function (triggers) {
    console.log(triggers)
  })
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("app listening on PORT " + PORT);
  });
});