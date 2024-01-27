const mongoose = require("mongoose")

const { Schema } = mongoose;

const UsersSchema = new Schema({


    "userName": {
        "type": String,
        required: true
    },
    "password": {
        "type": String,
        required: true
    },
    "mobileNumber": {
        "type": String,
        required: true
    },
    "email": {
        "type": String,
        required: true
    },
    "dateOfBirth": {
        "type": Date,
    },
    "address": {
        "street": {
            "type": String
        },
        "city": {
            "type": String
        },
        "state": {
            "type": String
        },
        "postalCode": {
            "type": String
        },
        "country": {
            "type": String,
            enum:['india']
        },
    },
    "role": {
        "type": String,
        enum: ['user', 'admin']
    }

})

const Users = mongoose.model("Users", UsersSchema)

module.exports = Users