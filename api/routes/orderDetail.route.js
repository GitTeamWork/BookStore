var orderDetailController = require("../controllers/orderDetail.controller")
var route = require("express").Router();

route.get('/api/orderDetail', function (req, res) {
    orderDetailController.orderDetail(req, res)
});
route.get('/api/getDetail/:id', function (req, res) {
    let userid = req.params.id;
    orderDetailController.getDetail(req, res, userid)
});
route.get('/api/sumItem/:id', function (req, res) {
    let userid = req.params.id;
    orderDetailController.sumItem(req, res, userid)
});
route.post('/api/addDetail', function (req, res) {
    orderDetailController.addDetail(req, res)
});
route.delete('/api/delItem', function(req, res){
    orderDetailController.delItem(req, res)
});
route.put('/api/updateItem/:id', function(req, res){
    orderDetailController.updateItem(req, res)
})
module.exports = route