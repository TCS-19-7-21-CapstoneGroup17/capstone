//load the user model
const orderModel = require('../model/order.model');
let userModel = require('../model/user.model');

//define the functions for use with the user table

//sign up for the grocery store, given all relevant user information. Will be performed by the user
let signUp = (request, response) => {
    let newUser = request.body;
    //check if user with the same email already exists. If not, add new user
    userModel.find({ emailId: newUser.emailId }, (err, result) => {
        if (!err) {
            if (result.length == 0) {
                //get highest userId, new user id will be that + 1
                userModel.find({}).sort([["_id", -1]]).exec((err1, result1) => {
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
                        //get highest bank account number. New user's account number will be this + 1
                        userModel.find({}).sort([["bankAccountNumber", -1]]).exec((err2, result2)=> {
                            if (!err2) {
                                let bankNum;
                                if (result2.length == 0) { //no existing users with bank account numbers. Start with 100000
                                    bankNum = 100000;
                                }
                                else {
                                    bankNum = result2[0].bankAccountNumber + 1;
                                }
                                //attempt to add the new user. loginAttempts will be 3, representing the amount of failed attempts the user can make to login before locking the account
                                //users start with $500 available funds, and $2500 in their bank account
                                userModel.insertMany({
                                    _id: userId, firstname: newUser.firstname, lastname: newUser.lastname,
                                    emailId: newUser.emailId, password: newUser.password, dob: newUser.dob, phone: newUser.phone,
                                    address: newUser.address, loginAttempts: 3, bankAccountNumber:bankNum,
                                    fundsAmt: 500, fundsAmt:2500 }, (err3, result3) => {
                                    if (!err3) {
                                        if (result3 == undefined) {
                                            response.json({ result: false, msg: "Failed to add user " + userId + ". Check that input types are valid" });
                                        }
                                        else {
                                            response.json({ result: true, msg: "Successfully added user " + userId, uid:userId });
                                        }
                                    }
                                    else {
                                        console.log("Error: " + err3);
                                        response.json({ result: false, msg: "Error: " + err3 });
                                    }
                                });
                            }
                            else {
                            response.json({ result: false, msg: "Error: " + err2 });
                            }
                        })
                    }
                    else {
                        console.log(err1);
                        response.json({ result: false, msg: "Error: " + err1 });
                    }
                });
            }
            else {
                console.log("Could not add user. User with this email already exists");
                response.json({ result: false, msg: "User with this email already exists" });
            }
        }
        else {
            response.json({ result: false, msg: "Error: " + err });
        }
    });
}

//attempt to sign in to a user account. Sign in using user ID and password
let signIn = (request, response) => {
    userLogin = request.body;
    //see if a user with this id exists
    userModel.find({ _id: userLogin._id }, (err, result) => {
        if (!err) {
            if (result.length == 0) { //id not found
                response.json({ result: false, msg: "ID or password is incorrect" })
            }
            else {
                //check remaining login attempts
                let attempts = result[0].loginAttempts;
                if (attempts <= 0) {
                    response.json({ result: false, msg: "No login attempts remaining. Your account has been locked" })
                }
                else {
                    //check password. Didn't check the first time because if ID didn't exist,
                    // we wouldn't be able to check remaining login attempts
                    userModel.find({ _id: userLogin._id, password: userLogin.password }, (err1, result1) => {
                        if (!err1) {
                            if (result1.length == 0) { //ID and password combination didn't match
                                //update remaining login attempts
                                userModel.updateMany({ _id: userLogin._id }, { $set: { loginAttempts: attempts - 1 } }, (err2, result2) => {
                                    if (!err2) {
                                        console.log(result2);
                                        response.json({ result: false, msg: "ID or password is incorrect" });
                                    }
                                    else {
                                        response.json({ result: false, msg: "Error: " + err2 });
                                    }
                                })
                            }
                            else {
                                //login successful. Update login attempts back to 3
                                userModel.updateMany({ _id: userLogin._id }, { $set: { loginAttempts: 3 } }, (err2, result2) => {
                                    if (!err2) {
                                        response.json({ result: true, msg: "Login successful" })
                                    }
                                    else {
                                        response.json({ result: false, msg: "Error: " + err2 });
                                    }
                                })

                            }
                        }
                        else {
                            response.json({ result: false, msg: "Error: " + err1 });
                        }
                    })
                }
            }
        }
        else {
            response.json({ result: false, msg: "Error: " + err });
        }
    })
}

// given {userID, totalCost} in request.body
let updateFund = (request, response) => {
    let updateInfo = request.body;
    console.log(updateInfo)
    userModel.find({ _id: updateInfo.userID }, (err, result) => {
        if (!err) {
            if (result.length == 0) {
                response.json({ result: false, msg: "Error: User ID not found" });
            }
            else {
                // if funds >= groceries cost
                console.log(result[0].fundsAmt + " " + updateInfo.totalCost);
                if (result[0].fundsAmt >= updateInfo.totalCost) {
                    userModel.updateMany({ _id: updateInfo.userID }, { $set: { fundsAmt: result[0].fundsAmt - updateInfo.totalCost } }, (err1, result1) => {
                        if (!err1) {
                            console.log(result1.modifiedCount)
                            if (result1.modifiedCount > 0) {
                                response.json({ result: true, msg: "Successfully update funds" });
                            }
                            else {
                                response.json({ result: false, msg: "Error: Funds not updated" });
                            }
                        }
                        else {
                            response.json({ result: false, msg: "Error: " + err1 });
                        }
                    })
                }
                else {
                    response.json({ result: false, msg: "Error: Insufficient funds" });
                }
            }
        }
        else {
            response.json({result: false, msg: "Error: " + err})
        }
    })
}

// gets the info to pre fill the response fields in the edit user panel
let getUserInfo = (request, response) => {
    // need employee id used request as placeholder
    let userId = request.body;
    userModel.findOne({_id:userId._id}, (err, res)=> {
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
    // still need the way to pull the user id, using placeholder instead
    let updatedInfo = request.body;
    userModel.updateOne({_id:updatedInfo._id},
        {$set:{firstname:updatedInfo.firstname, lastname:updatedInfo.lastname, emailId:updatedInfo.emailId, 
            password:updatedInfo.password, dob:updatedInfo.dob, phone:updatedInfo.phone, address:updatedInfo.address}},
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
    let usrId = request.params._id;
    userModel.findOne({_id:usrId}, (err, res)=> {
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
    let usrId = request.params._id;
    userModel.findOne({_id:usrId, bankAccountNumber:updateFunds.bankAccountref}, (err, res) => {
        if(res != null){
            console.log(res);
            let newAmt = parseInt(updateFunds.fundsAmtRef) + parseInt(res.fundsAmt);
            let bankAmt = parseInt(res.bankFunds) - parseInt(updateFunds.fundsAmtRef);
            userModel.updateOne({_id:usrId}, {$set:{fundsAmt:newAmt}}, (err1, res1) => {
                if(!err1){
                    userModel.updateOne({_id:usrId}, {$set:{bankFunds:bankAmt}}, (err2, res2) => {
                        if(!err2){
                            response.send("Funds Added");
                            console.log(res2);
                        }else{
                            console.log(err2);
                        }
                    })
                }else{
                    console.log(err1);
                }
            });
        }else{
            response.send("Invalid bank account");
        }
    })
}

let getOrderStatus = (request,response) => {
    let usrID = request.params.userId;
    orderModel.find({userId:usrID}, (err, data) => {
        if (!err) {
            console.log("sending data" + data);
            response.json(data);
        }
        else {
            response.json(err);
        }
    })
}

module.exports = {signUp, signIn, getUserInfo, editUserInfo, getUserFunds, addFunds, getOrderStatus, updateFund}
