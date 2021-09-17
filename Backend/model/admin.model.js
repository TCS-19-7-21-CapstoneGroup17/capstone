let mongoose = require("mongoose");

mongoose.pluralize(null);

let adminSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

// collection, schema
let adminModel = mongoose.model("Admin", adminSchema);
// let adminUsername = "admin";
// let adminPassword = "123";
// let adminLogin = {adminUsername,adminPassword};
//adminModel.insertMany(adminLogin);
module.exports = adminModel;