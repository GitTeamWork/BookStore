var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var paypal = require('paypal-rest-sdk');

var homeRoute = require("./api/routes/home.route");
var cataRoute = require("./api/routes/catalog.route");
var productRoute = require("./api/routes/product.route");
var publisherRoute = require("./api/routes/publisher.route");
var userRoute = require("./api/routes/user.route");
var adminRoute = require("./api/routes/admin.route");
var orderRoute = require("./api/routes/order.route");
var orderDetailRoute = require("./api/routes/orderDetail.route")
var payRoute = require("./api/routes/pay.route")
app.use("/assets", express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AZBZ2Qj67dTuyMdpZzKQjKghlxbB_XpvU6mOaqeU5ODG2iB7BcHrsRUmomZPcz6sQ13O_FIZJ1qDnbjl',
  'client_secret': 'EFVf6RdrNp9xuDbhoiecmwjOtPdiOnuv0rXuAQIzUj_vEE_Pv9u3TFgxSVaQAxzfS-UfODNk1Qz6Nu0I',
  'headers' : {
  'custom': 'header'
  }
});
//global.a = 0;
app.set("view engine","ejs");
// route mặc định 
//home
app.use(homeRoute);
// admin
app.use(adminRoute);
//user
app.use(userRoute);
// catalog
app.use(cataRoute);
//publisher
app.use(publisherRoute);
// production
app.use(productRoute);
//order
app.use(orderRoute);
//orderDetail
app.use(orderDetailRoute);
//payment
app.use(payRoute)
// chỉnh port
const post = process.env.PORT || 9000;
app.listen(post, function () {
    console.log(`Node app is running on port http://localhost:${post}`);
});
module.exports = app;