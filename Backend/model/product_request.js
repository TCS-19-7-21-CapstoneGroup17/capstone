const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductRequestSchema = new Schema({
  _id: Number,
  product: String,
  emp_id: String,
  quantity: Number,
  request_type:String
});

let requestModel = mongoose.model("Request", ProductRequestSchema);
module.exports = requestModel;
