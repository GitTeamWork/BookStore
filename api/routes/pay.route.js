var payController = require("../controllers/pay.controller")
var route = require("express").Router();

route.post('/pay/:id', function (req, res) {
    let userid = req.params.id;
    return payController.pay(req, res, userid)
});
route.get('/success', function(req, res){
    payController.success(req, res)
})
module.exports = route;