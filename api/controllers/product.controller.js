var db = require("../db")

function newProduct(req, res) {
    db.executeSql('select top (4) * from [Product]', function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};
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
function getProduct(req, res, productId) {
    var sql = `SELECT * from [Product] where productId= ${productId}`;
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
function addProduct(req, res) {
    try {
        let {productName, price, oldPrice, image, detail, inventory, catalogId, publisherId } = req.body;
        var sql = `INSERT INTO [Product] (productName, price, oldPrice, image, detail, inventory, catalogId, publisherId) VALUES  
        ('${productName}', ${price}, ${oldPrice}, '${image}' , '${detail}', ${inventory}, ${catalogId}, ${publisherId})`;
        console.log({ productName, price, oldPrice, image, detail, inventory, catalogId, publisherId })
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: {productName, price, oldPrice, image,detail  , inventory , catalogId ,publisherId} });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
    }
};
function updateProduct(req, res){
    try {
        let productId = req.params.id;
        let {productName, price, oldPrice, image, detail, inventory, catalogId, publisherId } = req.body;
        var sql = ` UPDATE [Product] SET productName = '${productName}', price = ${price}, oldPrice = ${oldPrice}, image = '${image}', detail = '${detail}', inventory = ${inventory}, catalogId = ${catalogId}, publisherId = ${publisherId}  WHERE productId = ${productId}`;
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let {rowsAffected} = result;
            if (rowsAffected[0]==1){
                res.json({message: "update thanh cong"});
            }
            else{
                res.json({message: "update that bai"});
            }
        })
    } catch (error) {
        res.json(error);
    }
}
function delProduct(req, res){
    try {
        let productId = req.params.id;
        var sql = ` DELETE FROM [Product] WHERE productId = ${productId}`;
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let {rowsAffected} = result;
            if (rowsAffected[0]==1){
                res.json({message: "xoa thanh cong"});
            }
            else{
                res.json({message: "xoa that bai"});
            }
        })
    } catch (error) {
        res.json(error);
    }
}
// show theo cata
function getcatalodId(req, res, catalogId) {
    var sql = `SELECT * from [Product] where catalogId= ${catalogId}`;
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
// show theo publicsher
function getpublisherId(req, res, publisherId) {
    var sql = `SELECT * from [Product] where publisherId= ${publisherId}`;
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


module.exports = {
    productList: productList,
    getProduct: getProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    delProduct: delProduct,
    newProduct: newProduct,
    getcatalodId: getcatalodId,
    getpublisherId: getpublisherId
}
//exports.userList = userList;