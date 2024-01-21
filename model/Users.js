const mongoose = require("mongoose")

const {Schema} = mongoose;

const UsersSchema = new Schema({

    
    "username": {
        "type":String,
        required : true
    },
    "password":{
        "type":String,
        required : true
    }, 
    "mobileNUmber" : {
        "type" : Number,
        required: true
    },
    "email":{
        "type":String,
        required : true
    }
    
})

const Users = mongoose.model("Users",UsersSchema)

module.exports = Users