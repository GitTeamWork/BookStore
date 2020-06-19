var db = require("../db")

function orderList(req, res) {
    db.executeSql('select * from [Order]', function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
function revenue(req, res, start, end) {
    var sql = `SELECT * FROM dbo.[Order] WHERE created BETWEEN '${start}' AND '${end}'`
    console.log(sql);
    
    db.executeSql(sql, function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
function sumRevenue(req, res, start, end) {
    var sql = `SELECT sum(total) sum FROM dbo.[Order] WHERE created BETWEEN '${start}' AND '${end}'`
    console.log(sql);
    
    db.executeSql(sql, function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
function getOrder(req, res, orderId) {
    var sql = `SELECT * from [Order] where orderId= ${orderId}`;
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
function addOrder(req, res) {
    try {
        let {userId} = req.body;
        var sql = `INSERT INTO [Order] (userId) VALUES (${userId})`;
        console.log({userId })
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: {userId} });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
    }
};
module.exports={
    orderList: orderList,
    getOrder: getOrder,
    addOrder: addOrder,
    revenue: revenue,
    sumRevenue: sumRevenue
}