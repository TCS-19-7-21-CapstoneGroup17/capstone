let express = require('express');
let productController = require('../controller/product.controller');

let router = express.Router();

// connect subpath '/getAllProducts' to the function getAllProductDetails
router.get('/getAllProducts', productController.getAllProductDetails);

// get A product's details 
router.get('/getProduct/:pName', productController.getProductDetail);

// add product
router.post('/addProduct', productController.addProduct);

//update product
router.post('/updateProduct', productController.updateProduct);

//delete product
router.post('/deleteProduct', productController.deleteProduct);

module.exports = router;