var db = require("../db")

function userList(req, res) {
    db.executeSql('select * from [User]', function (data, err) {
        if (err) {
            res.json(err);
        } else {
            res.json(data.recordset);
        }
        res.end();
    });
};

function getUser(req, res, userId) {
    var sql = `SELECT * from [User] where userId= '${userId}'`;
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
async function login(email, password, res) {
    try {
        var sql= `select * from [User] where email= '${email}' and password= '${password}'`;
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Dang nhap thanh cong' });
            }
            return res.json({ message: 'Dang nhap that bai' });
        })
    } catch (error) {
        res.json(error)
    }
}
async function signup(reqBody, res) {
    try {
        let { email, username, password } = reqBody;
        var sql = `INSERT INTO [User](email, username, password) VALUES  ('${email}', '${username}', '${password}')`;
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({ message: 'Them thanh cong', data: { email, username } });
            }
            return res.json({ message: 'Them that bai' });
        })
    } catch (error) {
        res.json(error)
    }

};
function updateUser(reqBody, res, userId){
    try {
        if (!reqBody) throw new Error("input not valid");
        let { fullname, phone } = reqBody;
        var sql = `UPDATE [User] SET fullname= '${fullname}' , phone= '${phone}' WHERE userId= ${userId}`
        console.log({ sql});
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({data: { fullname, phone }});
            }
            return res.json({ message: 'that bai' });
        })
    } catch (error) {
        
    }
}

function delUser(userId, res){
    try {
        var sql = `DELETE FROM [User] WHERE userId = ${userId}`;
        console.log({ sql});
        db.executeSql(sql, (result) => {
            let { rowsAffected } = result;
            if (rowsAffected[0] == 1) {
                return res.json({message: 'thanhcong'});
            }
            return res.json({ message: 'that bai' });
        })
    } catch (error) {
        
    }
}
module.exports = {
    userList: userList,
    getUser: getUser,
    login: login,
    signup: signup,
    updateUser: updateUser,
    delUser: delUser,
}
//exports.userList = userList;