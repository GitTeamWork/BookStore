var productController = require("../controllers/product.controller")
var route = require("express").Router();


route.get('/api/productList', function (req, res) {
    productController.productList(req, res)
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

module.exports = route;