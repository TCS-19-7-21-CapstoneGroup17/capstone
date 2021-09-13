let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

let productRouter = require('./router/product.router');


let app = express();
app.use(cors());

// connect to MongoDB database
let url = 'mongodb://localhost:27017';

mongoose.connect(url + '/tcsmean')
    .then(res => console.log("Connected to MongoDB database"))
    .catch(err => console.log(err));


// middleware to connect path to subpaths in productRouter
app.use('/api/products', productRouter);

// run server on port 9090
app.listen(9090, () => console.log('Server listening on port 9090'));