var orderController = require("../controllers/order.controller")
var route = require("express").Router();

route.get('/api/orderList', function (req, res) {
    orderController.orderList(req, res)
});
route.get('/api/order/:id', function (req, res) {
    let orderid = req.params.id;
    orderController.getOrder(req, res, orderid);
})
route.post('/api/addOrder', function(req, res) {
    orderController.addOrder(req, res);
})
module.exports = route;