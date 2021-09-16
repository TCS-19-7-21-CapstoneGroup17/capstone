let ticketModel = require('../model/ticket.model');

// get ticket info from request.body
let addTicket = (request, response) => {
    let ticket = request.body;
    ticketModel.insertMany(ticket, (err, result) => {
        if (!err) {
            console.log(result);
            response.json({ result: true, msg: "Successfully inserted ticket for user " + ticket.userID });
        }
        else {
            console.log("Error adding ticket")
            response.json({ result: false, msg: "Error: " + err });
        }
    })
}

module.exports = { addTicket }