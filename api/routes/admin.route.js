var route = require("express").Router();

route.get('/catalog-admin', function (req, res) {
    res.render("admin/catalog-admin");
});
route.get('/comment-admin', function (req, res) {
    res.render("admin/comment-admin");
});
route.get('/index-admin', function (req, res) {
    res.render("admin/index-admin");
});
route.get('/order-admin', function (req, res) {
    res.render("admin/order-admin");
});
route.get('/orderdetail-admin', function (req, res) {
    res.render("admin/comment-admin");
});
route.get('/product-admin', function (req, res) {
    res.render("admin/Product-admin");
});
route.get('/publisher-admin', function (req, res) {
    res.render("admin/publisher-admin");
});
route.get('/user-admin', function (req, res) {
    res.render("admin/user-admin");
});

module.exports = route;