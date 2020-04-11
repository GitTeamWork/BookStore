var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userController = require("./controllers/user.controller")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// route mặc định 
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/userList', function (req, res) {
    userController.userList(req, res)
});
app.get('/user/:id', function (req, res, userId) {
    let userid = req.query.id;
    userController.getUser(req, res, userid);
})
// app.get('/user/:thongtin', function(req, res, username, email, password){
//     let username = req.query.username;
//     let email = req.query.email;
//     let password = req.query.password;
//     console.log(username, email. password);

//     userController.login(req,res, username, email, password)
// })

app.get('/login', function (req, res) {
    let username = req.query.username;
    let password = req.query.password;
    //console.log({body: req.body});
    console.log(username);
    //let reqBody = { username};
    userController.login(username, password, res);

})
app.post('/createUser', (req, res) => {
    let { email, username, password } = req.body;
    console.log({ body: req.body });
    console.log({ email, username, password });
    let reqBody = { email, username, password };
    userController.CreateUser(reqBody, res);
    // const result= CreateUser(reqBody,res);
})

// chỉnh port
app.listen(process.env.PORT || 9000, function () {
    console.log('Node app is running on port 9000');
});
module.exports = app;