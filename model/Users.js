const mongoose = require("mongoose")

const {Schema} = mongoose;

const UsersSchema = new Schema({

    
    "userName": {
        "type":String,
        required : true
    },
    "password":{
        "type":String,
        required : true
    }, 
    "mobileNumber" : {
        "type" : String,
        required: true
    },
    "email":{
        "type":String,
        required : true
    }
    
})

const Users = mongoose.model("Users",UsersSchema)

module.exports = Users