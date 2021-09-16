let mongoose = require('mongoose');
mongoose.pluralize(null);

// this is the ticke that is raised for users to unlock their account
let ticketSchema = mongoose.Schema({
    userID: Number,
    reason: String
})

let ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;