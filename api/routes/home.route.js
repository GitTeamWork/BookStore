var cataController = require("../controllers/catalog.controller")
var route = require("express").Router();

route.get('/home', function (req, res) {
    res.render("user/home");
});

module.exports = route;