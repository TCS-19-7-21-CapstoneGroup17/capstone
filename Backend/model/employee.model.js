//load the mongoose module
let mongoose = require('mongoose');

//set pluralize to null to avoid 's' postfix and lowercase collection name
mongoose.pluralize(null);

//create the schema for employees
let employeeSchema = mongoose.Schema({
    _id:Number,
    firstname:String,
    lastname:String,
    //employee's email id should be unique. Will be used to log-in
    emailId:{type:String, unique:true},
    password:String
});

//create the model for employees using the schema
let employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;