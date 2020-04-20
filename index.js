var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var userController = require("./api/controllers/user.controller")
var productController = require("./api/controllers/product.controller")
var cataController = require("./api/controllers/catalog.controller")
app.use("/assets", express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine","ejs");
// route mặc định 
app.get('/', function (req, res) {
    res.render("index");
});
app.get('/home', function (req, res) {
    res.render("home");
});
app.get('/login', function (req, res) {
    res.render("login");
});

// remote method ===================
//user
app.get('/api/userList', function (req, res) {
    userController.userList(req, res)
});
app.get('/api/user/:id', function (req, res, userId) {
    let userid = req.params.id;
    userController.getUser(req, res, userid);
})
app.get('/api/login', function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    userController.login(email, password, res);

})
app.post('/api/signup', function(req, res) {
    let { email, username, password } = req.body;
    console.log({ body: req.body });
    console.log({ email, username, password });
    let reqBody = { email, username, password };
    userController.signup(reqBody, res);
    // const result= CreateUser(reqBody,res);
})
app.put('/api/updateUser/:id', function(req, res){
    let {fullname, phone} = req.body;
    let userId = req.params.id;
    let reqBody = {fullname, phone};
    userController.updateUser(reqBody, res, userId);
    
})
app.delete('/api/delUser/:id', function(req, res){
    let userId = req.params.id;
    userController.delUser(userId, res);
})
// catalog
app.get("/api/cataList", function(req, res){
    cataController.cataList(req, res);
})
app.post("/api/addCate", function(req, res){
    cataController.addCata(req, res);
})
app.put("/api/updateCata/:id", function(req, res){
    cataController.updateCata(req, res);
})
app.delete("/api/delCata/:id", function(req, res){
    cataController.delCata(req, res);
})
// production
app.get('/api/productList', function (req, res) {
    productController.productList(req, res)
});
app.post('/api/addProduct', function(req, res) {
    // let { email, username, password } = req.body;
    // console.log({ body: req.body });
    // console.log({ email, productName, price ,image,detail  , inventory , catalodId ,publisherId });
    // let reqBody = {email, productName, price ,image,detail  , inventory , catalodId ,publisherId };
    //userController.signup(reqBody, res);
    // const result= CreateUser(reqBody,res);
    productController.addProduct(req, res);
})

// chỉnh port
const post = process.env.PORT || 9000;
app.listen(post, function () {
    console.log(`Node app is running on port http://localhost:${post}`);
});
module.exports = app;