var publisherController = require("../controllers/publisher.controller")
var route = require("express").Router();


route.get("/api/publisherList", function(req, res){
    publisherController.publisherList(req, res);
})
route.post("/api/addpublisher", function(req, res){
    publisherController.addpublisher(req, res);
})
route.put("/api/updatepublisher/:id", function(req, res){
    publisherController.updatepublisher(req, res);
})
route.delete("/api/delpublisher/:id", function(req, res){
    publisherController.delpublisher(req, res);
})
module.exports = route;