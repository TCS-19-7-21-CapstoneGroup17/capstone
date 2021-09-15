//load the orderModel
let orderModel = require('../model/order.model');
const { report } = require('../router/user.router');

//define the functions for use with the order table

//Will be performed by admin. Generate report of all orders
//Can specify a specific user or 

//Will be performed by admin. Generate report of orders made in a specific day
let generateDailyReport = (request, response)=> {
    let reportDay = request.body;
    if (reportDay.filter == "") { //not filtering by product or user
        orderModel.find({day:reportDay.day, month:reportDay.month, year:reportDay.year}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportDay.filter == "user") { //will filter with a specific user id
        orderModel.find({day:reportDay.day, month:reportDay.month, year:reportDay.year, userId:reportDay.userId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportDay.filter == "product") { //will filter with a specific product id
        orderModel.find({day:reportDay.day, month:reportDay.month, year:reportDay.year, productId:reportDay.productId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else { //invalid input for filter
        response.send({result:false, msg:"Invalid filter input"});
    }
}

//Will be performed by admin. Generate report of orders made in a specific month
let generateMonthlyReport = (request, response)=> {
    let reportMonth = request.body;
    if (reportMonth.filter == "") { //not filtering by a product or user
        orderModel.find({month:reportMonth.month, year:reportMonth.year}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportMonth.filter == "user") { //will filter with a specific user id
        orderModel.find({month:reportMonth.month, year:reportMonth.year, userId:reportMonth.userId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportMonth.filter == "product") { //will filter with a specific product id
        orderModel.find({month:reportMonth.month, year:reportMonth.year, productId:reportMonth.productId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else {
        response.send({result:false, msg:"Invalid filter input"});
    }
    
}

//Will be performed by admin. Generate report of orders made in a specific month
let generateYearlyReport = (request,response)=> {
    let reportYear = request.body;
    if (reportYear.filter == "") { //not filtering by a product or user
        orderModel.find({year:reportYear.year}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportYear.filter == "user") { //will filter with a specific user id
        orderModel.find({year:reportYear.year, userId:reportYear.userId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else if (reportYear.filter == "product") { //will filter with a specific product id
        orderModel.find({year:reportYear.year, productId:reportYear.productId}, (err, result)=> {
            if (!err) {
                response.send({result:true, records:result});
            }
            else {
                response.send({result:false, msg: "Error: " + err});
            }
        })
    }
    else {
        response.send({result:false, msg:"Invalid filter input"});
    }
}

module.exports = {generateDailyReport, generateMonthlyReport, generateYearlyReport}