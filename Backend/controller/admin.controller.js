let adminModel = require("../model/admin.model");

let signIn = (req, res) => {
    let admin = req.body;    // receive the data from post method
    console.log(admin)
    adminModel.find({username: admin.username}, {password: admin.password}, (err, result) => {
        if (result.length != 0) {
            res.json({result:true})
        }
        else {
            res.json({result:false, msg: "Invalid username or password"});
        }
    });
}

module.exports = { signIn }