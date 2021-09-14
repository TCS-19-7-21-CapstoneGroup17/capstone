let productModel = require('../model/product.model');


// HTTP GET request for ALL products in Products table
let getAllProductDetails = (request, response) => {
    productModel.find({}, (err, data) => {
        if (err) {
            response.json(err);
        }
        else {
            response.json(data);
        }
    })
}

// HTTP GET request for A product in Products table
// get the product name from url
// send the array of all rows in Products table that have that product name
let getProductDetail = (request, response) => {
    let productName = request.params.pName;
    productModel.find({productName: productName}, (err, data) => {
        if (err) response.json(err)
        else {
            response.json(data);
        }
    })
}


module.exports = { getAllProductDetails, getProductDetail };