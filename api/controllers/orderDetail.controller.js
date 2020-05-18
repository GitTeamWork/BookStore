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
function sumItem(req, res, userId) {
    var sql = `SELECT SUM(quantity) as sumitem FROM [OrderDetail] WHERE orderId = (SELECT orderId  FROM dbo.[Order] WHERE userId = ${userId} AND status = 0)`;
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
        let { productId, quantity, amount, userId } = req.body;
        //let userId = req.params.id;
        // var sql = `INSERT INTO [OrderDetail] (orderId, productId, quantity, amount) VALUES (${orderId}, ${productId}, ${quantity}, ${amount})`;
        var sql = `EXEC dbo.SP_ADDDETAIL @productid = ${productId},  -- int
                                         @quantity = ${quantity}, -- int
                                         @amount = ${amount},   -- float
                                         @userid = ${userId}      -- int`;
        //console.log({ orderId, productId, quantity, amount })
        console.log(sql);

        db.executeSql(sql, (result) => {
            //console.log(result+"..........................................");
            if (result != null) {
                let { rowsAffected } = result;
                if (rowsAffected[0] == 1) {
                    return res.json("Them thanh cong");
                }
            }
            else {
                return res.json('San pham da ton tai, vui long update gio hang');
            }
        })
    } catch (error) {
        res.json(error)
        console.log(error);

    }
};
function delItem(req, res) {
    try {
        let { productId } = req.body;
        var sql = `DELETE FROM dbo.OrderDetail WHERE productId =${productId}`;
        console.log(sql);

        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                res.json({ message: "xoa thanh cong" });
            }
            else {
                res.json({ message: "xoa that bai" });
            }
        })
    } catch (error) {
        res.json(error)
        console.log(error);

    }
};
module.exports = {
    orderDetail: orderDetail,
    getDetail: getDetail,
    addDetail: addDetail,
    delItem: delItem,
    sumItem: sumItem
}