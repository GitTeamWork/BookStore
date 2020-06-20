var payController = require("../controllers/pay.controller")
var route = require("express").Router();

route.post('/updateaddress/:id', function (req, res) {
    let userid = req.params.id;
    return payController.updateAdress(req, res, userid)
});
route.post('/payCOD/:id', function (req, res) {
    let userid = req.params.id;
    return payController.COD(req, res, userid)
});
route.post('/pay/:id', function (req, res) {
    let userid = req.params.id;
    return payController.pay(req, res, userid)
});
route.get('/success', function(req, res){
    payController.success(req, res)
})
module.exports = route;