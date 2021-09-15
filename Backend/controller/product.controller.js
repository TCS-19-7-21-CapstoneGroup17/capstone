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

let addProduct = (req, res) =>{
    let product = req.body;

    productModel.insertMany(product,(err, result)=> {
        if (!err){
            res.send("Product stored successfully");
            //return to dashboard?
        }
        else{
            res.send(err);
        }
    })
}
let updateProduct = (req, res) =>{
    let product = req.body;
    
    //let ?price = product.productPrice;
    //let ?quantity = product.productQuantity;
    productModel.find({productName:product.productName},(err,result)=>{
        //update with new price or quantity
    })
}
let deleteProduct = (req, res) =>{
    let product = req.body;
    
    productModel.find({productName:product.productName},(err,result)=>{
        //delete entry
    })
}

module.exports = { getAllProductDetails, getProductDetail, addProduct, updateProduct, deleteProduct };