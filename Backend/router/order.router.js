//load the express module and the orderController
let express = require('express');
let orderController = require('../controller/order.controller');

//create the router reference
let router = express.Router();

//assign url paths to methods
router.post("/dailyReport", orderController.generateDailyReport);
router.post("/weeklyReport", orderController.generateWeeklyReport);
router.post("/monthlyReport", orderController.generateMonthlyReport);
router.post("/yearlyReport", orderController.generateYearlyReport);

module.exports = router;