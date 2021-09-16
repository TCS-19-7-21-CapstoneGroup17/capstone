//load the mongoose module
let mongoose = require('mongoose');

//set pluralize to null to avoid 's' postfix and lowercase collection name
mongoose.pluralize(null);

//create the schema for employees
let employeeSchema = mongoose.Schema({
    id:String,
    firstname:String,
    lastname:String, 
    email:{type:String, unique:true}, //employee's email id should be unique. Will be used to log-in
    password:String,
    changedPassword: {
        type: Boolean,
        default: 0
    }
});

//create the model for employees using the schema
module.exports = mongoose.model("employees", employeeSchema);