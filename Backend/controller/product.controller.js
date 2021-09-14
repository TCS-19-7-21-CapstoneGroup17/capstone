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

// in the request body, given an ONE product in json format
// (quantity given <= quantity in database)
// new quantity = quantity in db - quantity given in body
let updateProducts = (request, response) => {
    let updateProduct = request.body;

    productModel.findOne({ productName: updateProduct.productName }, (err, result) => {
        if (!err) {
            if (result && result.quantity >= updateProduct.quantity) {
                
                productModel.updateOne({ productName: updateProduct.productName }, { $set: { quantity: result.quantity - updateProduct.quantity } }, (err1, result1) => {
                    if (!err1) {
                        if (result1.modifiedCount > 0) {
                            console.log("Successfully modified product: " + updateProduct.productName);
                            response.json({ result: true, msg: "Successfully modified product: " + updateProduct.productName });
                        }
                    }
                    else {
                        console.log("Error modifying product: " + updateProduct.productName);
                        response.json({ result: false, msg: "Error: " + err1 });
                    }
                })
            }
            else {
                response.json({ result: false, msg: "Error: Product does not exist in database" });
            }
        }
        else {
            response.json({ result: false, msg: "Error: " + err });
        }
    })
}


module.exports = { getAllProductDetails, getProductDetail, updateProducts };