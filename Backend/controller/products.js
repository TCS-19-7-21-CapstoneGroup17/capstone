const asyncHandler = require("../middlewares/async");
const Products = require("../models/Products");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Products);






exports.updateProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body)
    Products.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((product) => 
      res.status(200).json({status: true, product, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `id ${String(req.params.id)} could not be inserted, Err ${err}`}));
});


exports.getAllProducts = asyncHandler(getAllObjectsFromDB)

exports.getProductsByQuery = asyncHandler(getObjectsByQueryFromDB)
