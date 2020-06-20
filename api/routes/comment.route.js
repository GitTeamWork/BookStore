var commentController = require("../controllers/comment.controller")
var route = require("express").Router();


route.get("/api/getComment/:productid", function(req, res){
    commentController.getComment(req, res);
})
route.post("/api/addComment", function(req, res){
    commentController.addComment(req, res);
})


module.exports = route;