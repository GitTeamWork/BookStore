var productController = require("../controllers/product.controller")
var route = require("express").Router();


route.get('/api/productList', function (req, res) {
    productController.productList(req, res)
});
route.get('/api/newProduct', function (req, res) {
    productController.newProduct(req, res)
});
route.get('/api/product/:id', function (req, res) {
    let productid = req.params.id;
    productController.getProduct(req, res, productid);
})
route.post('/api/addProduct', function(req, res) {
    productController.addProduct(req, res);
})
route.put("/api/updateProduct/:id", function(req, res){
    productController.updateProduct(req, res);
})

route.delete("/api/delProduct/:id", function(req, res){
    productController.delProduct(req, res);
})
//showcata
route.get('/api/productcatalogId/:id', function (req, res) {
    let catalogId = req.params.id;
    productController.getcatalodId(req, res, catalogId);
})
//showpblic
route.get('/api/productpublisherId/:id', function (req, res) {
    let publisherId = req.params.id;
    productController.getpublisherId(req, res, publisherId);
})
route.get('/api/search', function (req, res) {
    //let catalogId = req.params.id;
    productController.getsearch(req, res);
})
module.exports = route;