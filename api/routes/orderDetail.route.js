var orderDetailController = require("../controllers/orderDetail.controller")
var route = require("express").Router();

route.get('/api/orderDetail', function (req, res) {
    orderDetailController.orderDetail(req, res)
});
route.get('/api/getDetail/:id', function (req, res) {
    let orderid = req.params.id;
    orderDetailController.getDetail(req, res, orderid)
});
route.post('/api/addDetail', function (req, res) {
    //console.log(req);
    //console.log(res);
    orderDetailController.addDetail(req, res)
});
module.exports = route