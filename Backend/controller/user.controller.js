//load the user model
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
                        //attempt to add the new user. loginAttempts will be 3, representing the amount of failed attempts the user can make to login before locking the account
                        //users start with $500 available funds
                        userModel.insertMany({
                            _id: userId, firstname: newUser.firstname, lastname: newUser.lastname,
                            emailId: newUser.emailId, password: newUser.password, dob: newUser.dob, phone: newUser.phone,
                            address: newUser.address, loginAttempts: 3, fundsAmt: 500
                        }, (err2, result2) => {
                            if (!err) {
                                if (result2 == undefined) {
                                    response.json({ result: false, msg: "Failed to add user " + userId + ". Check that input types are valid" });
                                }
                                else {
                                    response.json({ result: true, msg: "Successfully added user " + userId, uid:userId });
                                }
                            }
                            else {
                                console.log("Error: " + err2);
                                response.json({ result: false, msg: "Error: " + err2 });
                            }
                        });
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

module.exports = { signUp, signIn }