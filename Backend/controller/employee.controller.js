//load the usermodel
let employeeModel = require("../model/employee.model");

//define the functions for use with the employee table

//add an employee, given their firstname, lastname, and email address. Will be performed by Admin
//employees start with the same password and ids are auto-generated
let addEmployee = (request, response)=> {
    let newEmp = request.body;
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
            employeeModel.insertMany({id:empId, firstname:newEmp.firstname, lastname:newEmp.lastname, 
                email:newEmp.email, password:"temporary@123"}, (err1, result1) => {
                if (!err1) {
                    response.send({result:true, msg:"Successfully added employee " + empId});
                    console.log("Successfully added employee " + empId);
                }
                else {
                    console.log(err1);
                    response.send({result:false, msg:"Error: " + err1});
                }
            })
        }
        else {
            console.log(err);
            response.send({result:false, msg:"Error: " + err});
        }
    });
}

//Delete an employee using their id
let deleteEmployee = (request, response)=> {
    let employeeId = request.body;
    employeeModel.deleteOne({id:employeeId.id}, (err, result)=> {
        if (!err) {
            if (result.deletedCount == 1) {
                console.log("Successfully deleted employee " + employeeId.id);
                response.send({result:false, msg:"Successfully deleted employee " + employeeId.id});
            }
            else {
                console.log("No employee with that ID found");
                response.send({result:false, msg:"No employee with that ID found"});
            }
            
        } 
        else {
            console.log(err);
            response.send({result:false, msg:result});
        }
    })
}

module.exports = {addEmployee, deleteEmployee};
