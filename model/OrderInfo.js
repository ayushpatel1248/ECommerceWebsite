const { string } = require("joi");
const mongoose = require("mongoose")

const {Schema} = mongoose;

const OrderInfoSchema = new Schema({
    "userid":{
        type:string,
        required: true
    },
})

const OrderInfo = mongoose.model("OrderInfo",OrderInfoSchema)


module.exports = Cart
