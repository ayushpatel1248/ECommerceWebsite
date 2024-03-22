const mongoose = require("mongoose")

const {Schema} = mongoose;

const checkoutSchema = new Schema({

    "userID" : {
        type : mongoose.Types.ObjectId,
        required:true
    },

    "checkoutDetails" : {
        type :Array,
        required:true
    }
})

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout; 