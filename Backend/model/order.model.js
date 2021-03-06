//load the required module
let mongoose = require('mongoose');

//set pluralize to null to avoid 's' postfix and lowercase collection name
mongoose.pluralize(null);

//Create the schema for orders
let orderSchema = mongoose.Schema({
    _id: Number,
    userId: Number,
    productName: String,
    productId: Number, //delete later?
    price: Number, //price for an individual object (not the total, if purchasing multiple. Can calculate that using this and quantity)
    day: Number,
    month: Number, //Note: Months start with 0 (January)
    year: Number,
    quantity: Number,
    status: String //Status of the order like shipped, delivered, etc.
});

//create the model for orders using the schema
let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;