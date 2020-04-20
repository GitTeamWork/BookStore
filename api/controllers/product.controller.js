var db = require("../db")

function productList(req, res) {
    db.executeSql('select * from [Product]', function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
function post(reqBody, res) {
    try {
        let { email, username, password } = reqBody;
        var sql = `INSERT INTO [User](productId, productName, price, image, detail, inventory, catalodId, publisherId) VALUES  
        ('${productId}', '${productName}', '${price}', '${image} , '${detail}', '${inventory}', '${catalodId}', '${publisherId}'')`;
        
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: { email, productName, price ,image,detail  , inventory , catalodId ,publisherId} });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
    }
};




module.exports = {
    productList,
}
//exports.userList = userList;