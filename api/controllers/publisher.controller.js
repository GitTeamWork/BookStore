var db = require("../db");

function publisherList(req, res) {
    try {
        var sql = `SELECT * FROM [Publisher]`;
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


function addPublisher(req, res){
    try {
        let publisherName = req.body.publisherName;
        var sql = ` INSERT INTO [publisher] (publisherName) VALUES ('${publisherName}') `;
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let {rowsAffected} = result;
            if (rowsAffected[0]==1){
                res.json({message: "them thanh cong"});
            }
            else{
                res.json({message: "them that bai"});
            }
        })
    } catch (error) {
        res.json(error);
    }
}

function updatePublisher(req, res){
    try {
        let publisherId = req.params.id;
        let publisherName = req.body.publisherName;
        var sql = ` UPDATE [Publisher] SET publisherName = '${publisherName}' WHERE publisherId = ${publisherId}`;
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

function delPublisher(req, res){
    try {
        let publisherId = req.params.id;
        var sql = ` DELETE FROM [publisher] WHERE publisherId = ${publisherId}`;
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

module.exports = {
    publisherList: publisherList,
    addPublisher: addPublisher,
    updatePublisher: updatePublisher,
    delPublisher: delPublisher,
}