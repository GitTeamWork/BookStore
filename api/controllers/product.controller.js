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
function addProduct(req, res) {
    try {
        let {productName, price, image, detail, inventory, catalogId, publisherId } = req.body;
        var sql = `INSERT INTO [Product] (productName, price, image, detail, inventory, catalogId, publisherId) VALUES  
        ('${productName}', ${price}, '${image}' , '${detail}', ${inventory}, ${catalogId}, ${publisherId})`;
        console.log({ productName, price, image, detail, inventory, catalogId, publisherId })
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: {productName, price ,image,detail  , inventory , catalogId ,publisherId} });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
    }
};




module.exports = {
    productList: productList,
    addProduct: addProduct,
}
//exports.userList = userList;