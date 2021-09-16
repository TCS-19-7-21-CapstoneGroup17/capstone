const mongoose = require("mongoose");

const PORT = process.env.PORT || 9090;
exports.connect = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
