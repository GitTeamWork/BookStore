var userController = require("../controllers/user.controller")
var route = require("express").Router();


route.get('/login', function (req, res) {
    res.render("login");
});
route.get('/register', function (req, res) {
    res.render("register");
});
route.get('/api/userList', function (req, res) {
    userController.userList(req, res)
});
route.get('/api/user/:id', function (req, res, userId) {
    let userid = req.params.id;
    userController.getUser(req, res, userid);
})
route.post('/api/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    userController.login(email, password, res);
})
route.post('/api/signup', function(req, res) {
    let { email, username, password } = req.body;
    console.log({ body: req.body });
    console.log({ email, username, password });
    let reqBody = { email, username, password };
    userController.signup(reqBody, res);
    // const result= CreateUser(reqBody,res);
})
route.put('/api/updateUser/:id', function(req, res){
    let {fullname, phone} = req.body;
    let userId = req.params.id;
    let reqBody = {fullname, phone};
    userController.updateUser(reqBody, res, userId);
    
})
route.delete('/api/delUser/:id', function(req, res){
    let userId = req.params.id;
    userController.delUser(userId, res);
})

module.exports = route;