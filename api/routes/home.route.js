var cataController = require("../controllers/catalog.controller")
var route = require("express").Router();

route.get('/home', function (req, res) {
    res.render("user/home");
});
route.get('/shop-gird', function (req, res) {
    res.render("user/shop-gird");
});
route.get('/single-product/:id', function (req, res) {
    res.render("user/single-product",{id: req.params.id});
});
route.get('/showproductcatalog/:id', function (req, res) {
    res.render("user/showproductcatalog",{id: req.params.id});
});
route.get('/showproductpublisher/:id', function (req, res) {
    res.render("user/showproductpublisher",{id: req.params.id});
});
module.exports = route;