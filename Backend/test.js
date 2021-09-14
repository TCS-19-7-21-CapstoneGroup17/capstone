//use this file to test backend
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
//load routers
let employeeRouter = require('./router/employee.router');
let productRouter = require('./router/product.router');
let userRouter = require('./router/user.router');

//create express reference and add middleware
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/admin", employeeRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

//connect the database
mongoose.connect("mongodb://localhost:27017/capstone").
then(res=>console.log("Connected to mongodb")).catch(error=>console.log(error));

app.listen(9090, ()=>console.log("Server running on port number 9090"));