var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var userController = require("./api/controllers/user.controller")

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
app.get('/userList', function (req, res) {
    userController.userList(req, res)
});
app.get('/user/:id', function (req, res, userId) {
    let userid = req.params.id;
    userController.getUser(req, res, userid);
})
app.get('/login', function (req, res) {
    let email = req.query.email;
    let password = req.query.password;
    userController.login(email, password, res);

})
app.post('/signup', function(req, res) {
    let { email, username, password } = req.body;
    console.log({ body: req.body });
    console.log({ email, username, password });
    let reqBody = { email, username, password };
    userController.signup(reqBody, res);
    // const result= CreateUser(reqBody,res);
})
app.put('/updateUser/:id', function(req, res){
    let {fullname, phone} = req.body;
    let userId = req.params.id;
    let reqBody = {fullname, phone};
    userController.updateUser(reqBody, res, userId);
    
})
app.delete('/user/:id', function(req, res){
    let userId = req.params.id;
    userController.delUser(userId, res);
})
// chỉnh port
app.listen(process.env.PORT || 9000, function () {
    console.log('Node app is running on port 9000');
});
module.exports = app;