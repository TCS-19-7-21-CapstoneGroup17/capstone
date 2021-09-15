//load the user model
let userModel = require('../model/user.model');

//define the functions for use with the user table

//sign up for the grocery store, given all relevant user information. Will be performed by the user
let signUp = (request, response)=> {
    let newUser = request.body;
    //check if user with the same email already exists. If not, add new user
    userModel.find({emailId:newUser.emailId}, (err, result)=> {
        if (!err) {
            if (result.length == 0) {
                //get highest userId, new user id will be that + 1
                userModel.find({}).sort([["_id",-1]]).exec((err1, result1)=> {
                    let userId = 0;
                    if (!err1) {
                        //If there are no existing users, start with id 1
                        if (result1.length == 0) {
                            userId = 1;
                        }
                        else {
                            //sorted from highest to lowest, so result[0] will have the highest id
                            userId = result1[0]._id + 1;
                        }
                        //attempt to add the new user. loginAttempts will be 3, representing the amount of failed attempts the user can make to login before locking the account
                        userModel.insertMany({_id:userId, firstname:newUser.firstname, lastname:newUser.lastname,
                            emailId:newUser.emailId, password:newUser.password, dob:newUser.dob, phone:newUser.phone,
                            address:newUser.address, loginAttempts:3}, (err2, result2)=> {
                                if (!err) {
                                    if (result2 == undefined) {
                                        response.json({result:false, msg:"Failed to add user " + userId + ". Check that input types are valid"});
                                    }
                                    else {
                                        response.json({result:true, msg:"Successfully added user " + userId});
                                    }
                                }
                                else {
                                    console.log("Error: " + err2);
                                    response.json({result:false, msg:"Error: " + err2});
                                }
                            });
                    }
                    else 
                    {
                        console.log(err1);
                        response.json({result:false, msg:"Error: " + err1});
                    }
                });
            }
            else 
            {
                console.log("Could not add user. User with this email already exists");
                response.json({result:false, msg:"User with this email already exists"});
            }
        }
        else
        {
            response.json({result:false, msg:"Error: " + err});
        }
    });
}

//attempt to sign in to a user account. 
let signIn = (request, response)=> {
    userLogin = request.body;
    //see if a user with this emailId exists
    userModel.find({emailId:userLogin.emailId}, (err, result)=>{
        if (!err) {
            if (result.length == 0) { //email not found
                response.json({result:false, msg:"Email or password is incorrect"})
            }
            else {
                //check remaining login attempts
                let attempts = result[0].loginAttempts;
                if (attempts <= 0) {
                    response.json({result:false, msg:"No login attempts remaining. Your account has been locked"})
                }
                else {
                    //check password. Didn't check the first time because if emailId didn't exist,
                    // we wouldn't be able to check remaining login attempts
                    userModel.find({emailId:userLogin.emailId, password:userLogin.password}, (err1, result1) => {
                        if (!err1) {
                            if (result1.length == 0) { //email and password combination didn't match
                                //update remaining login attempts
                                userModel.updateMany({emailId:userLogin.emailId}, {$set:{loginAttempts:attempts - 1}}, (err2, result2)=> {
                                    if (!err2) {
                                        console.log(result2);
                                        response.json({result:false, msg:"Email or password is incorrect"});
                                    }
                                    else {
                                        response.json({result:false, msg:"Error: " + err2});
                                    }
                                })
                            }
                            else {
                                //login successful. Update login attempts back to 3
                                userModel.updateMany({emailId:userLogin.emailId}, {$set:{loginAttempts:3}}, (err2, result2)=> {
                                    if (!err2) {
                                        response.json({result:true, msg:"Login successful"})
                                    }
                                    else {
                                        response.json({result:false, msg:"Error: " + err2});
                                    }
                                })
                                
                            }
                        }  
                        else {
                            response.json({result:false, msg:"Error: " + err1});
                        }
                    })
                }
            }
        }
        else {
            response.json({result:false, msg:"Error: " + err});
        }
    })
}

// gets the info to pre fill the response fields in the edit user panel
let getUserInfo = (request, response) => {
    // need employee id used request as placeholder
    let userId = request.body;
    userModel.findOne({_id:userId}, (err, res)=> {
        if(!err){
            response.json(res);
        }else{
            response.json(err);
        }
    })
}

// with input prefilled we can update all of it at once since user can change any and leave the rest
let editUserInfo = (request, response) => {
    // still need the way to pull the user id, using placeholder instead
    let updatedInfo = request.body;
    userModel.updateOne({_id:updatedInfo.id},
        {$set:{firstname:updatedInfo.firstname}},
        {$set:{lastname:updatedInfo.lastname}},
        {$set:{emailId:updatedInfo.emailId}},
        {$set:{password:updatedInfo.password}},
        {$set:{dob:updatedInfo.dob}},
        {$set:{phone:updatedInfo.phone}},
        {$set:{address:updatedInfo.address}},
        (err, res) => {
            if(!err){
                response.json(res);
            }else{
                response.json(err);
            }
        });
}

let getUserFunds = (request, response) => {
    // pull the id
    let userId = request.body;
    userModel.findOne({_id:userId}, (err, res) => {
        if(!err){
            response.send(res.fundsAmt)
        }else{
            response.json(err);
        }
    })
}

let addFunds = (request, response) => {
    // pull the id
    let updateFunds = request.body;
    userModel.findOne({_id:userId}, (err, res) => {
        if(!err){
            if(res.fundsAmt != null){
                let newAmt = parseInt(userId.amt) + res.fundsAmt;
                userModel.updateOne({_id:updateFunds.id}, {$set:{fundsAmt:newAmt}}, {$set:{bankAccountNumber:updateFunds.bankAccountNumber}}, (err1, res1) => {
                    if(!err1){
                        response.json(res1);
                    }else{
                        response.json(err1);
                    }
                });
            }
        }else{
            response.json(err);
        }
    })
}

module.exports = {signUp, signIn, getUserInfo, editUserInfo, getUserFunds, addFunds}
