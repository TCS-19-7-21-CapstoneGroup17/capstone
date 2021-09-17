let adminModel = require("../model/admin.model");

let signIn = async (req, res) => {
    let admin = req.body;    // receive the data from post method
    adminModel.find({ username: admin.username, password: admin.password }, (err, result) => {
        if (!err) {
            res.send("Success");
        }
        else {
            res.send("InValid username or password");
        }
    })
}

module.exports = { signIn }