var paypal = require('paypal-rest-sdk');
var db = require("../db");
const { json } = require('body-parser');


var userID;
//var arr = [];
// function getItem(req, res, userId) {
//     var sql = `SELECT productName, amount
//     FROM ORDERDETAIL INNER JOIN PRODUCT ON PRODUCT.productId = ORDERDETAIL.productId 
//     WHERE orderId = (SELECT orderId  FROM dbo.[Order] WHERE userId = ${userId} AND status = 0)`;

//     return db.executeSql(sql, function (data, err) {

//         if (err) {
//             res.json(err);
//         } else {
//             arr = (data.recordset);
//             console.log((arr));
//             console.log(typeof (arr));
//             return arr;
//             //console.log("--------------------------"+items);
//         }

//     });


//     //return arr;
// }

function pay(req, res, userid) {
    userID=userid
    console.log(userID);
    
    var sql = `SELECT productName name, OrderDetail.productId sku, price, currency='USD', quantity
    FROM ORDERDETAIL INNER JOIN PRODUCT ON PRODUCT.productId = ORDERDETAIL.productId 
    WHERE orderId = (SELECT orderId  FROM dbo.[Order] WHERE userId = ${userid} AND status = 0)`;
    var arr = []
    db.executeSql(sql, function (data, err) {
        if (err) {
            console.log(err);
        } else {
            arr = (data.recordset);
            console.log(arr);
            var total = 0;
            for (let i = 0; i < arr.length; i++) {
                total += parseFloat(arr[i].price * arr[i].quantity)
            }
            var create_payment_json = {
                "intent": "authorize",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "http://localhost:9000/success",
                    "cancel_url": "http://cancel.url"
                },
                "transactions": [{
                    "item_list": {
                        "items": arr
                    },
                    "amount": {
                        "currency": "USD",
                        "total": total.toString()
                    },
                    "description": "This is the payment description."
                }]
            };

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    console.log(error.response);
                    throw error;
                } else {
                    for (var index = 0; index < payment.links.length; index++) {
                        //Redirect user to this endpoint for redirect url
                        if (payment.links[index].rel === 'approval_url') {
                            //console.log(payment.links[index].href);
                            res.redirect(payment.links[index].href)
                        }
                    }
                    //console.log(payment);
                }
            });

        }

    });
}
function success(req, res) {
    payerID = req.query.PayerID;

    var sql = `SELECT productName name, OrderDetail.productId sku, price, currency='USD', quantity
    FROM ORDERDETAIL INNER JOIN PRODUCT ON PRODUCT.productId = ORDERDETAIL.productId 
    WHERE orderId = (SELECT orderId  FROM dbo.[Order] WHERE userId = ${userID} AND status = 0)`;
    var arr = []
    db.executeSql(sql, function (data, err) {
        if (err) {
            console.log(err);
        } else {
            arr = (data.recordset);
            console.log(arr);
            var total = 0;
            for (let i = 0; i < arr.length; i++) {
                total += parseFloat(arr[i].price * arr[i].quantity)
            }
            var execute_payment_json = {
                "payer_id": payerID,
                "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": total.toString()
                    }
                }]
            };
            var paymentId = req.query.paymentId;
            addPayment(req, res);
            function addPayment(req, res) {
                try {
                    var sql = `
                    EXEC dbo.SP_INSERT_PAY @userid = ${userID},     -- int
                               @payertid = N'${payerID}', -- nvarchar(50)
                               @paymentid = N'${paymentId}' -- nvarchar(50) `;
                    console.log(sql);
                    db.executeSql(sql, (result, error) => {
                        if (error) {
                            console.log("----------" + error);
                        }
                        else {
                            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                                if (error) {
                                    console.log(error.response);
                                    throw error;
                                } else {
                                    return res.render("user/success");
                                    // console.log("Get Payment Response");
                                    // console.log(JSON.stringify(payment));
                                }
                            });
                        }
                    })
                } catch (error) {
                    res.json(error)
                    console.log(error);

                }
            };


        }
    })




}
module.exports = {
    pay: pay,
    success: success,
}