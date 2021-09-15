//load the orderModel
let orderModel = require('../model/order.model');
let dateFns = require('date-fns') //date-related functions. Will use with weekly report generation
const { report } = require('../router/user.router');

//define the functions for use with the order table

//Will be performed by admin. Generate report of orders made in a specific day
//Can specify a specific user or product to filter with
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

//Will be performed by admin. Generate report of orders made in a specific week (Week starts with Sunday in this function)
//Can specify a specific user or product to filter with
//Reminder: January is month 0 when using the date object
let generateWeeklyReport = (request,response)=> {
    let reportWeek = request.body;
    //get all records. Will need all of them to create and process date objects (can't do from DB)
    orderModel.find({}, (err, result)=> {
        if (!err) {
            //go through each record and build an array of records in the same week as the given date
            if (reportWeek.filter == "") { //not filtering by a product or user
                let givenDate = new Date(reportWeek.year, reportWeek.month, reportWeek.day);
                let genReport = [];
                for (let rec of result) {
                    let recDate = new Date(rec.year, rec.month, rec.day);
                    if (dateFns.isSameWeek(givenDate, recDate)) {
                        genReport.push(rec);
                    }
                }
                response.send({result:true, records:genReport});
            }
            else if (reportWeek.filter == "user") { //will filter with a specific user id
                let givenDate = new Date(reportWeek.year, reportWeek.month, reportWeek.day);
                let genReport = [];
                for (let rec of result) {
                    let recDate = new Date(rec.year, rec.month, rec.day);
                    if (dateFns.isSameWeek(givenDate, recDate) && (reportWeek.userId == rec.userId)) {
                        genReport.push(rec);
                    }
                }
                response.send({result:true, records:genReport});
            }
            else if (reportWeek.filter == "product") { //will filter with a specific product id
                let givenDate = new Date(reportWeek.year, reportWeek.month, reportWeek.day);
                let genReport = [];
                for (let rec of result) {
                    let recDate = new Date(rec.year, rec.month, rec.day);
                    if (dateFns.isSameWeek(givenDate, recDate) && (reportWeek.productId == rec.productId)) {
                        genReport.push(rec);
                    }
                }
                response.send({result:true, records:genReport});
            }
            else {
                response.send({result:false, msg:"Invalid filter input"});
            }
        }
        else {
            response.send({result:false, msg:"Error: " + err})
        }
    })
}

//Will be performed by admin. Generate report of orders made in a specific month
//Can specify a specific user or product to filter with
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
//Can specify a specific user or product to filter with
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

module.exports = {generateDailyReport, generateWeeklyReport, generateMonthlyReport, generateYearlyReport}