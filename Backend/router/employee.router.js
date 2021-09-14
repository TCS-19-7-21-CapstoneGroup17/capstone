//load the express module
let express = require('express');
const { model } = require('mongoose');

//create router reference
let router = express.Router();
//load controller
let employeeController = require('../controller/employee.controller');
let employeeModel = require('../model/employee.model');

//handle REST methods using controller functions, and define urls used to call them
router.post("/addEmployee/", employeeController.addEmployee);
router.delete("/deleteEmployee/", employeeController.deleteEmployee);

module.exports = router;