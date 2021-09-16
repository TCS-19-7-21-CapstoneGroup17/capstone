const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Orders = require("../models/Orders");
const Users = require("../models/Orders");
const Products = require("../models/Products");
const dayjs = require("dayjs");

let {
  getAllObjectsFromDB,
  getObjectsByQueryFromDB,
  updateObjectInDB,
  deleteObjectFromDB,
  insertObjectInDB,
} = require("./utils")(Orders);

const fetchOrdersFromDB = async (number, string) => {
  return await Orders.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $dateFromString: {
                    dateString: "$date",
                    format: "%m/%d/%Y",
                  },
                },
                dayjs().subtract(number, string).toDate(),
              ],
            },
            {
              $lte: [
                {
                  $dateFromString: {
                    dateString: "$date",
                    format: "%m/%d/%Y",
                  },
                },
                dayjs().toDate(),
              ],
            },
          ],
        },
      },
    },
  ]);
};




exports.getOrdersByStatus = asyncHandler(async (req, res, next) => {
  let status = req.params["status"];

  Orders.find({ status: status })
    .then((order) =>
      res
        .status(200)
        .json({ status: true, order, message: "Found the following orders" })
    )
    .catch((err) =>
      res
        .status(422)
        .json({ status: false, message: "Issue with finding orders" })
    );
});

exports.updateStatus = asyncHandler(async (req, res, next) => {
  let id = req.params["id"];
  let status = req.body["status"];

  Orders.findOneAndUpdate(
    { id: id },
    { $set: { status: status } },
    { new: true }
  )
    .then((order) =>
      res.status(200).json({
        status: true,
        order,
        message: "Found & Updated the following order",
      })
    )
    .catch((err) =>
      res.status(422).json({
        status: false,
        message: "Issue with finding/updating the order",
      })
    );

});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let { recipient_id, status, product_ids } = req.body;

  let [recepient] = await Users.find({ id: recipient_id });
  if (!recepient)
    return res
      .status(400)
      .json({ status: false, message: "No Such User registered in DB" });

  let list = await Products.find({ id: { $in: product_ids } });
  if (list.length !== product_ids.length)
    return res.status(400).json({
      status: false,
      message: "Some of the product_ids are not available in DB",
    });

  DBstate = { id, recepient, list };
  updateObjectInDB(DBstate)(req, res, next);
});

