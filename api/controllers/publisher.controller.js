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


function addpublisher(req, res){
    try {
        let cataName = req.body.publisherName;
        var sql = ` INSERT INTO [publisher] VALUES ('${publisherName}') `;
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

function updatepublisher(req, res){
    try {
        let cataId = req.params.id;
        let cataName = req.body.cata;
        var sql = ` UPDATE [Publisher] SET publisherName = '${publisherName}' WHERE publisherId = ${publisherId}`;
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

function delpublisher(req, res){
    try {
        let cataId = req.params.id;
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
    addpublisher: addpublisher,
    updatepublisher: updatepublisher,
    delpublisher: delpublisher,
}