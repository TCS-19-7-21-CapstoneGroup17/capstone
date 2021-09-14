let express = require('express');
let productController = require('../controller/product.controller');

let router = express.Router();

// connect subpath '/getAllProducts' to the function getAllProductDetails
router.get('/getAllProducts', productController.getAllProductDetails);

// get A product's details 
router.get('/getProduct/:pName', productController.getProductDetail);

router.put('/updateProduct', productController.updateProducts);

module.exports = router;