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
    var sql = `SELECT * from [User] where username= '${userId}'`;
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
async function login(username, password, res) {
    try {
        //let {username} = reqBody;
        //console.log({username});
        var sql= `select * from [User] where username= '${username}' and password= '${password}'`;
        console.log({ sql});
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
async function CreateUser(reqBody, res) {
    try {
        let { email, username, password } = reqBody;
        console.log({ email, username, password });
        var sql = `INSERT INTO [User](email, username, password) VALUES  ('${email}', '${username}', '${password}')`;
        console.log({ sql });
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
module.exports = {
    userList: userList,
    getUser: getUser,
    login: login,
    CreateUser: CreateUser,
}
//exports.userList = userList;