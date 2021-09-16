const employees = require("./v1/employees");
const orders = require("./v1/orders");
const products = require("./v1/products");
const profile = require("./v1/profile");
const product_request = require("./v1/product_request")

module.exports = (app) => {
  app.use("/v1/employees", employees);
  app.use("/v1/orders", orders);
  app.use("/v1/products", products);
  app.use("/v1/profile", profile);
  app.use("/v1/productrequest/",product_request)
};
