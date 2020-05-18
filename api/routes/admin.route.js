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


route.get('/user-admin', function (req, res) {
    res.render("admin/user-admin");
});

//product
route.get('/product-admin', function (req, res) {
    res.render("admin/Product-admin");
});
route.get('/product-admin/search', function (req, res) {
    res.render("admin/Product-admin");
});
route.get('/addproduct-admin', function (req, res) {
    res.render("admin/addproduct-admin");
});
route.get('/updateproduct-admin/:id', function (req, res) {
    res.render("admin/updateproduct-admin",{id: req.params.id});
});


// publisher
route.get('/publisher-admin', function (req, res) { 
    res.render("admin/publisher-admin");
});
route.get('/addpublisher-admin', function (req, res) {
    res.render("admin/addpublisher-admin");
});
route.get('/updatepublisher-admin/:id', function (req, res) {
    res.render("admin/updatepublisher-admin",{id: req.params.id});
});


// catalog
route.get('/addcatalog-admin', function (req, res) {
    res.render("admin/addcatalog-admin");
});
route.get('/updatecatalog-admin/:id', function (req, res) {
    res.render("admin/updatecatalog-admin");
});


module.exports = route;