//load the express module and the controller
let express = require('express');
let userController = require('../controller/user.controller')

//create router reference
let router = express.Router();

//handle REST methods using controller functions, and define urls used to call them
router.post("/signUp/", userController.signUp);
router.get("/editProfile/", userController.getUserInfo);
router.post("/editProfile/update/", userController.editUserInfo);
router.get("/addFunds/", userController.getUserFunds);
router.post("/addFunds/update/", userController.addFunds);
router.post("/signIn/", userController.signIn);
router.get("/orderStatus", userController.getOrderStatus);

module.exports = router;