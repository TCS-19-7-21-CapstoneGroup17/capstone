//load the express module and the controller
let express = require('express');
let ticketController = require('../controller/ticket.controller');

//create router reference
let router = express.Router();

//handle REST methods using controller functions, and define urls used to call them
router.post("/addTicket", ticketController.addTicket);

module.exports = router;