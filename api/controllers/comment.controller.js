var db = require("../db");

function getComment(req, res) {

    try {
        let productId = req.params.productid;
        var sql = `SELECT username, content, created FROM [Comment] INNER JOIN [User] ON [Comment].userId = [User].userId WHERE [Comment].productId=${productId}`;
        db.executeSql(sql, function (data, err) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data.recordset);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


function addComment(req, res){
    try {
        let {userId, productId, content} = req.body;
        var sql = ` INSERT INTO [Comment] (userId, productId, content) VALUES (${userId}, ${productId}, N'${content}') `;
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let {rowsAffected} = result;
            if (rowsAffected[0]==1){
                res.json({message: "them thanh cong"} );
            }
            else{
                res.json({message: "them that bai"});
            }
        })
    } catch (error) {
        res.json(error);
    }
}
module.exports = {
    getComment: getComment,
    addComment: addComment
}