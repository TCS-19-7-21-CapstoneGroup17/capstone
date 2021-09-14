//load the user model
let userModel = require('../model/user.model');

//define the functions for use with the user table

//sign up for the grocery store, given all relevant user information. Will be performed by the user
let signUp = (request, response)=> {
    let newUser = request.body;
    //check if user with the same email already exists
    userModel.find({emailId:newUser.emailId}, (err, result)=> {
        if (result.length == 0) {

        }
        else 
        {
            Response.send({result:false, msg:"User with this email already exists"});
        }
    });

}