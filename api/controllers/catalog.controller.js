var db = require("../db");

function cataList(req, res) {
    try {
        var sql = `SELECT * FROM [Catalog] ORDER BY catalogId DESC;`;
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


function addCata(req, res){
    try {
        let cataName = req.body.catalogName;
        var sql = ` INSERT INTO [Catalog] (catalogName) VALUES (N'${cataName}') `;
        console.log(sql);
        
        db.executeSql(sql, (result) => {
            let {rowsAffected} = result;
            if (rowsAffected[0]==1){
                res.json({message: "them thanh cong",data : {cataName}} );
            }
            else{
                return res.json('San pham da ton tai, vui long update gio hang');
            }
        })
    } catch (error) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
        res.json(error);
    }
}

function updateCata(req, res){
    try {
        let cataId = req.params.id;
        let cataName = req.body.catalogName;
        var sql = ` UPDATE [Catalog] SET catalogName = N'${cataName}' WHERE catalogId = N'${cataId}'`;
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

function delCata(req, res){
    try {
        let cataId = req.params.id;
        var sql = ` DELETE FROM [Catalog] WHERE catalogId = ${cataId}`;
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
    cataList: cataList,
    addCata: addCata,
    updateCata: updateCata,
    delCata: delCata,
}