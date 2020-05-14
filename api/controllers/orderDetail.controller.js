var db = require("../db")

function orderDetail(req, res) {
    db.executeSql('select * from [OrderDetail]', function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
function getDetail(req, res, userId) {
    var sql = `SELECT * FROM [OrderDetail] WHERE orderId = (SELECT orderId  FROM dbo.[Order] WHERE userId = ${userId} AND status = 0)`;
    console.log(sql);

    db.executeSql(sql, function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
}
function addDetail(req, res) {
    try {
        let {orderId, productId, quantity, amount} = req.body;
        var sql = `INSERT INTO [OrderDetail] (orderId, productId, quantity, amount) VALUES (${orderId}, ${productId}, ${quantity}, ${amount})`;
        console.log({ orderId, productId, quantity, amount })
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: {orderId, productId, quantity, amount} });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
        console.log(error);
        
    }
};
module.exports = {
    orderDetail: orderDetail, 
    getDetail: getDetail,
    addDetail: addDetail
}