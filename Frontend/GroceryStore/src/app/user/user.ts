export interface User {
    _id:Number,
    firstname:String,
    lastname:String,
    emailId:String,
    password:String,
    dob:String,
    phone:Number,
    address:String,
}

export interface UserWithFunds {
    _id:Number,
    firstname:String,
    lastname:String,
    emailId:String,
    password:String,
    dob:String,
    phone:Number,
    address:String,
    bankAccountNumber:Number,
    fundsAmt:Number
}