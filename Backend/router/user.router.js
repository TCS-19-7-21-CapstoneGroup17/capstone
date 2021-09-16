//load the express module and the controller
let express = require('express');
let userController = require('../controller/user.controller')

//create router reference
let router = express.Router();

//assign url paths to methods
router.post("/signUp/", userController.signUp);
router.post("/signIn/", userController.signIn);
router.post("/updateFund", userController.updateFund)

module.exports = router;