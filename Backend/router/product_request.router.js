//load the modules
let requestController = require('../controller/product_request.controller')
let express = require('express');
let router = express.Router();

router.post("/addRequest", requestController.placeProductRequest);
router.post("/getRequests", requestController.getProductRequests);
router.post("/deleteRequest", requestController.deleteProductRequest);

module.exports = router;