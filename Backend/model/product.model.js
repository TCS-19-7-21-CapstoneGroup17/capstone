let mongoose = require('mongoose');
mongoose.pluralize(null);

let productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    quantity: Number,
    image: String
})

let productModel = mongoose.model("Product", productSchema);

module.exports = productModel;