//load the user model
const orderModel = require('../model/order.model');
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
                        //users start with $500 available funds
                        userModel.insertMany({_id:userId, firstname:newUser.firstname, lastname:newUser.lastname,
                            emailId:newUser.emailId, password:newUser.password, dob:newUser.dob, phone:newUser.phone,
                            address:newUser.address, loginAttempts:3, fundsAmt:500}, (err2, result2)=> {
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

//attempt to sign in to a user account. Sign in using user ID and password
let signIn = (request, response)=> {
    userLogin = request.body;
    //see if a user with this id exists
    userModel.find({_id:userLogin._id}, (err, result)=>{
        if (!err) {
            if (result.length == 0) { //id not found
                response.json({result:false, msg:"ID or password is incorrect"})
            }
            else {
                //check remaining login attempts
                let attempts = result[0].loginAttempts;
                if (attempts <= 0) {
                    response.json({result:false, msg:"No login attempts remaining. Your account has been locked"})
                }
                else {
                    //check password. Didn't check the first time because if ID didn't exist,
                    // we wouldn't be able to check remaining login attempts
                    userModel.find({_id:userLogin._id, password:userLogin.password}, (err1, result1) => {
                        if (!err1) {
                            if (result1.length == 0) { //ID and password combination didn't match
                                //update remaining login attempts
                                userModel.updateMany({_id:userLogin._id}, {$set:{loginAttempts:attempts - 1}}, (err2, result2)=> {
                                    if (!err2) {
                                        console.log(result2);
                                        response.json({result:false, msg:"ID or password is incorrect"});
                                    }
                                    else {
                                        response.json({result:false, msg:"Error: " + err2});
                                    }
                                })
                            }
                            else {
                                //login successful. Update login attempts back to 3
                                userModel.updateMany({_id:userLogin._id}, {$set:{loginAttempts:3}}, (err2, result2)=> {
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
    let usrId = request.body;
    userModel.findOne({_id:usrId.userId}, (err, res)=> {
        if(!err){
            console.log(res)
            response.json(res);
        }else{
            response.json(err);
        }
    })
}

// with input prefilled we can update all of it at once since user can change any and leave the rest
let editUserInfo = (request, response) => {
    let info = request.body;
    console.log(info);
    if (info.firstnameRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { firstname: info.firstnameRef } }, (err, result) => {
            if (!err) {
                response.send("First Name updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.lastnameRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { lastname: info.lastnameRef } }, (err, result) => {
            if (!err) {
                response.send("Last Name updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.emailIdRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { emailId: info.emailIdRef } }, (err, result) => {
            if (!err) {
                response.send("Email updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.passwordRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { password: info.passwordRef } }, (err, result) => {
            if (!err) {
                response.send("Password updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.dobRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { dob: info.dobRef } }, (err, result) => {
            if (!err) {
                response.send("Date of Birth updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.phoneRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { phone: info.phoneRef } }, (err, result) => {
            if (!err) {
                response.send("Phone Number updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    if (info.addressRef != null) {
        userModel.updateOne({ _id: info.userId }, { $set: { address: info.addressRef } }, (err, result) => {
            if (!err) {
                response.send("Address updated successfully");
            }
            else {
                response.send(err);
            }
        })
    }
    console.log("updated");
}

let getUserFunds = (request, response) => {
    // pull the id
    let usrId = request.body;
    userModel.findOne({_id:usrId.userId}, (err, res)=> {
        if(!err){
            console.log(res)
            response.json(res);
        }else{
            response.json(err);
        }
    })
}

let addFunds = (request, response) => {
    // pull the id
    let updateFunds = request.body;
    userModel.findOne({_id:updateFunds.userId, bankAccountNumber:updateFunds.bankAccountref}, (err, res) => {
        if(!err){
            if(res.fundsAmt != null){
                let newAmt = updateFunds.fundsAmtRef + res.fundsAmt;
                let bankAmt = res.xyz - updateFunds.fundsAmtRef
                userModel.updateOne({_id:updateFunds.userId}, {$set:{fundsAmt:newAmt}}, (err1, res1) => {
                    if(!err1){
                        userModel.updateOne({_id:updateFunds.userId}, {$set:{fundsAmt:bankAmt}}, (err2, res2) => {
                            if(!err2){
                                response.json(res2);
                            }else{
                                response.json(err2);
                            }
                        })
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

let getOrderStatus = (request,response) => {
    let usrID = request.body;
    orderModel.find({userId:usrID.userId}, (err, data) => {
        if (!err) {
            console.log("sending data" + data);
            response.json(data);
        }
        else {
            response.json(err);
        }
    })
}

module.exports = {signUp, signIn, getUserInfo, editUserInfo, getUserFunds, addFunds, getOrderStatus}
