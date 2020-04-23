var cataController = require("../controllers/catalog.controller")
var route = require("express").Router();


route.get("/api/cataList", function(req, res){
    cataController.cataList(req, res);
})
route.post("/api/addCate", function(req, res){
    cataController.addCata(req, res);
})
route.put("/api/updateCata/:id", function(req, res){
    cataController.updateCata(req, res);
})
route.delete("/api/delCata/:id", function(req, res){
    cataController.delCata(req, res);
})

module.exports = route;