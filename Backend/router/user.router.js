//load the express module and the controller
let express = require('express');
let userController = require('../controller/user.controller')

//create router reference
let router = express.Router();

//handle REST methods using controller functions, and define urls used to call them
router.post("/signUp/", userController.signUp);
router.post("/editProfile", userController.getUserInfo);
router.put("/editProfile/update", userController.editUserInfo);
router.post("/addFunds", userController.getUserFunds);
router.put("/addFunds/update/", userController.addFunds);
router.post("/signIn/", userController.signIn);
router.post("/orderStatus", userController.getOrderStatus);

module.exports = router;