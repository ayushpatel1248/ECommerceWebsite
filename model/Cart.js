const mongoose = require("mongoose")

const {Schema} = mongoose;

const CartSchema = new Schema({

    
    "userid": {
        "type":"string",
        required : true
    },
    "items": [
        {
          "productid": {
            "type": "string" ,
            required: true,
          },
          "quantity": {
            "type": "Number",
            required: true,
            min: 1,
          },
        },
      ],
})

const Cart = mongoose.model("Cart",CartSchema)

module.exports = Cart