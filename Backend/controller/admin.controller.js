let adminModel = require("../model/admin.model");

let signIn = async (req,res)=> {
    let admin = req.body;    // receive the data from post method
    let adminInfo = await adminModel.findOne({username:admin.username,password:admin.password});
    if(adminInfo!=null){
        res.send("Success"); 
        //route to dashboard     
    }else {
        res.send("InValid username or password");
         // re-login
    }
}

module.exports = { signIn }