//load the orderModel
let orderModel = require('../model/order.model');

//define the functions for use with the order table

//Will be performed by admin. Generate report of all orders made
//Can specify if it should make a daily report, weekly report, monthly report, or give all data
let generateReport = (request, response)=> {
    let reportType = request.body;
    //get all records. Will need to extract their Date() objects to process
    orderModel.find({}, (err, result)=> {
        if (!err) {
            
        }
        else {

        }
    })
}

//Will be performed by admin. Generate report of all orders made with a specific product
//Can specify if it should make a daily report, weekly report, monthly report, or give all data
let generateProductReport = (request, response)=> {

}

//Will be performed by admin. Generate report of all orders made by a specific customer
//Can specify if it should make a daily report, weekly report, monthly report, or give all data
let generateUserReport = (request, response)=> {

}

module.exports = {generateReport, generateProductReport, generateUserReport}