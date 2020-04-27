var publisherController = require("../controllers/publisher.controller")
var route = require("express").Router();


route.get("/api/publisherList", function(req, res){
    publisherController.publisherList(req, res);
})
route.post("/api/addPublisher", function(req, res){
    publisherController.addPublisher(req, res);
})
route.put("/api/updatePublisher/:id", function(req, res){
    publisherController.updatePublisher(req, res);
})
route.delete("/api/delPublisher/:id", function(req, res){
    publisherController.delPublisher(req, res);
})
module.exports = route;