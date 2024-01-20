const mongoose = require("mongoose")

const {Schema} = mongoose;

const UsersSchema = new Schema({

    
    "username": {
        "type":"string",
        required : true
    },
    "password":{
        "type": "string",
        required : true
    },
    "email":{
        "type":"string",
        required : true
    }
    
})

const Users = mongoose.model("Users",UsersSchema)

module.exports = Users