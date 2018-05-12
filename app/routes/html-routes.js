var express = require("express");

var router = express.Router();

var path = require('path');

// renders index.handlebars
router.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname, "../views/sign-in.html"));
    res.render("index");
})

// renders sign-in.handlebars
router.get("/sign-in", function (req, res) {
    //res.sendFile(path.join(__dirname, "../views/sign-in.html"));
    res.render("sign-in");
})

// renders contact.handlebars
router.get("/contact", function (req, res) {
    //res.sendFile(path.join(__dirname, "../views/sign-in.html"));
    res.render("contact");
})

module.exports = router;