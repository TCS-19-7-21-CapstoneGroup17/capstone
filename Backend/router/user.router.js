//load the express module and the controller
let express = require('express');
let userController = require('../controller/user.controller')

//create router reference
let router = express.Router();

//handle REST methods using controller functions, and define urls used to call them
router.post("/signUp/", userController.signUp);
router.post("/signIn/", userController.signIn);

module.exports = router;