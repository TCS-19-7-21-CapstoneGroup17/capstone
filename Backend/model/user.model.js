//load the required module
let mongoose = require('mongoose');

//set pluralize to null to avoid 's' postfix and lowercase collection name
mongoose.pluralize(null);

//define the user schema
let userSchema = mongoose.Schema({
    _id:Number,
    firstname:String,
    lastname:String,
    emailId:{type:String, unique:true}, //user's email should be unique. Will be used to log-in
    password:String,
    dob:String,
    phone:Number,
    address:String,
    loginAttempts:Number
});

//create the user model using the user schema
let userModel = mongose.model("User", userSchema);

module.exports = userModel;