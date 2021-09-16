//load the express module
let express = require('express');
const { model } = require('mongoose');

//create router reference
let router = express.Router();
//load controller
let employeeController = require('../controller/employee.controller');
let employeeModel = require('../model/employee.model');

//assign urls to methods
router.post("/addEmployee/", employeeController.addEmployee);
router.delete("/deleteEmployee/", employeeController.deleteEmployee);

module.exports = router;