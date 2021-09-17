//load the module
let productRequestModel = require('../model/product_request')

//define the functions
let placeProductRequest = (request, response) => {
    let newRequest = request.body;
    //get highest id, next new id will be that + 1
    productRequestModel.find({}).sort([["_id",-1]]).exec((err, result)=> {
        let reqId = 0;
        if (!err) {
            //If there are no existing employees, start with id 1
            if (result.length == 0) {
                reqId = 1;
            }
            else {
                //sorted from highest to lowest, so result[0] will have the highest id
                reqId = result[0]._id + 1;
            }
            productRequestModel.insertMany({_id:reqId, product:newRequest.product, emp_id:newRequest.emp_id, 
            quantity:newRequest.quantity, request_type:newRequest.request_type}, (err, result)=> {
                if (!err) {
                    response.json({result:true, msg:"Successfully inserted request"})
                }
                else {
                    response.json({result:false, msg:"Error: " + err})
                }
            })
        }
    });
}

let getProductRequests = (request, response) => {
    productRequestModel.find({}, (err, result)=> {
        if (!err) {
            response.json({result:true, requests:result});
        }
        else {
            response.json({result:false, msg:"Error: " + err});
        }
    })
}

let deleteProductRequest = (request, response) => {
    reqId = request.body;
    productRequestModel.deleteOne({_id:reqId._id}, (err,result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                response.json({result:true, msg:"Successfully deleted request"})
            }
            else {
                response.json({result:false, msg:"No request with this ID found"})
            }
        }
        else {
            response.json({result:false, msg:"Error " + err})
        }
    })
}

module.exports = {placeProductRequest, getProductRequests, deleteProductRequest}