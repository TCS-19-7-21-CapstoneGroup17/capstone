let mongoose = require('mongoose');
mongoose.pluralize(null);

let productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    quantity: Number
})

let productModel = mongoose.model("Products", productSchema);

module.exports = productModel;