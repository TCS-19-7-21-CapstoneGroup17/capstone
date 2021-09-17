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
    productModel.find({ productName: productName }, (err, data) => {
        if (err) response.json(err)
        else {
            response.json(data);
        }
    })
}

let addProduct = (req, res) => {
    let product = req.body;
    console.log(product);
    productModel.insertMany(product, (err, result) => {
        if (!err) {
            res.send("Product stored successfully");
        }
        else {
            res.send("Error: " + err);
        }
    })
}
let updateProduct = (req, res) => {
    let product = req.body;
    if (product.price != null && product.quantity != null){
        res.json({result:false, msg:"Can only change price or quantity, not both"})
    }
    else if (product.price != null) {
        productModel.updateOne({ productName: product.productName }, { $set: { price: product.price } }, (err, result) => {
            if (!err) {
                if (result.matchedCount > 0) {
                    res.json({result: true, msg:"Product's price updated successfully"})
                }
                else {
                    res.json({result:false, msg:"Product with this name was not found"})
                }
            }
            else {
                res.json({result: false, msg: "Error: " + err})
            }
        })
    }
    else if (product.quantity != null) {
        productModel.updateOne({ productName: product.productName }, { $set: { quantity: product.quantity } }, (err, result) => {
            if (!err) {
                res.json({ result: true, msg: "Product's quantity updated successfully" })
            }
            else {
                res.json({ result: false, msg: "Error: " + err})
            }
        })
    }
    else {
        res.json({result: false, msg:"Did not update product: Both quantity and price were null"})
    }

}
let deleteProduct = (req, res) => {
    let product = req.body;

    productModel.deleteOne({ productName: product.productName }, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                res.json({result:true, msg:"Product deleted successfully"});
            }
            else {
                res.json({result:false, msg:"Product with this name was not found"});
            }
        }
        else {
            res.json({result:false, msg:"Error: " + err});
        }
    })
}

module.exports = { getAllProductDetails, getProductDetail, addProduct, updateProduct, deleteProduct };
