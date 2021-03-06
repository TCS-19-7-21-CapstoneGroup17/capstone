//load the employeeModel and adminModel(used for validating functions performed by admin)
let employeeModel = require("../model/employee.model");
let adminModel = require('../model/admin.model');


//define the functions for use with the employee table

//add an employee, given their firstname, lastname, and email address. Will be performed by Admin
//employees start with the same password and ids are auto-generated
let addEmployee = (request, response)=> {
    let newEmpRequest = request.body;
    console.log(newEmpRequest);
    //validate admin login that was sent along with new employee request. If admin login is incorrect, do not add
    adminModel.find({username:newEmpRequest.adminUsername},{password:newEmpRequest.adminPassword}, (err0, result0) => {
        if (!err0) {
            if (result0.length == 0) { //admin account not found
                response.json({result:false, msg:"Admin credentials invalid"})
            }
            else { //admin account found, proceed
                //get the highest existing id from the employees table. The new employee's id will be that + 1
                employeeModel.find({}).sort([["_id",-1]]).exec((err, result)=> {
                    let empId = 0;
                    if (!err) {
                        //If there are no existing employees, start with id 1
                        if (result.length == 0) {
                            empId = 1;
                        }
                        else {
                            //sorted from highest to lowest, so result[0] will have the highest id
                            empId = result[0]._id + 1;
                        }
                        //every newly added employee's password will be "temporary@123", will be prompted to change at their first login
                        employeeModel.insertMany({_id:empId, firstname:newEmpRequest.firstname, lastname:newEmpRequest.lastname, 
                            email:newEmpRequest.email, password:"temporary@123"}, (err1, result1) => {
                            if (!err1) {
                                response.json({result:true, msg:"Successfully added employee " + empId});
                                console.log("Successfully added employee " + empId);
                            }
                            else {
                                console.log(err1);
                                response.json({result:false, msg:"Error: " + err1});
                            }
                        })
                    }
                    else {
                        console.log(err);
                        response.json({result:false, msg:"Error: " + err});
                    }
                });
            }
        }
        else {
            response.json({result:false, msg:"Error: " + err0});
        }
    })
}

//Delete an employee using their id. Will be performed by Admin
let deleteEmployee = (request, response)=> {
    let delEmpRequest = request.body;
    console.log(delEmpRequest)
    //validate admin login that was sent with the employee deletion request. If login is incorrect, do not delete
    // adminModel.find({username:delEmpRequest.adminUsername},{password:delEmpRequest.adminPassword}, (err0, result0) => {
    //     console.log("check1")
    //     if (!err0)
    //     {
    //         if (result0.length == 0) { //admin account not found
    //             response.json({result:false, msg:"Admin credentials invalid"})
    //         }
    //         else { //admin account found, proceed
                employeeModel.deleteOne({_id:delEmpRequest._id}, (err, result)=> {
                    if (!err) {
                        console.log(result);
                        if (result.deletedCount > 0) {
                            console.log("Successfully deleted employee " + delEmpRequest._id);
                            response.json({result:true, msg:"Successfully deleted employee " + delEmpRequest._id});
                        }
                        else {
                            console.log("No employee with that ID found");
                            response.json({result:false, msg:"No employee with that ID found"});
                        }
                        
                    } 
                    else {
                        console.log(err);
                        response.json({result:false, msg:result});
                    }
                })
    //         }
    //     }
    //     else {
    //         response.json({result:false, msg:"Error: " + err0});
    //     }
    // });
}

let signInEmployee = (request, response) => {
    console.log("method called")
    let login = request.body;
    employeeModel.find({empId:login.empId, password:login.password}, (err, result)=>{
        if (!err) {
            if(result.length != 0){
                // Employee successfully logged in
                console.log(result);
                response.json({result:true});
            }else{
                // failed login
                console.log("login failed");
                response.json({result:false, msg: "Login failed, Incorrect ID or Password"});
            }
        }
        else {
            response.json({result:false, msg: "Error: " + err});
        }
    });
}

module.exports = {addEmployee, deleteEmployee, signInEmployee};
