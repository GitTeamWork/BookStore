var orderController = require("../controllers/order.controller")
var route = require("express").Router();

route.get('/api/orderList', function (req, res) {
    orderController.orderList(req, res)
});
route.get('/api/revenueFill', function (req, res) {
    let startD = req.query.start;
    let endD = req.query.end;
    orderController.revenue(req, res, startD, endD)
});
route.get('/api/order/:id', function (req, res) {
    let orderid = req.params.id;
    orderController.getOrder(req, res, orderid);
})
route.post('/api/addOrder', function(req, res) {
    orderController.addOrder(req, res);
})
module.exports = route;