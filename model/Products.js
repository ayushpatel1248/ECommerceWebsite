const mongoose = require("mongoose")

const { Schema } = mongoose;

const ProductSchema = new Schema({

    "name": {
        "type": "String",
        required: true,
    },
    "brand": {
        "type": "String",
        required: true,
    },
    "price": {
        "type": "Number",
        required: true,
        min: 0,
    },
    "dicount": {
        "type" : "Number",
        required: true
    },
    "description": {
        "type": "String",
        required: true,
    },
    "volume": {
        "type": "Number",
        required: true,
        min: 0,
    },
    "gender": {
        "type": "String", // 'Male', 'Female', 'Unisex', etc.
    },
    "packaging": {
        "type": "String", // 'Bottle', 'Spray', etc.
    },
    "rating": {
        "type": "Number",
        min: 0,
        max: 5,
    },
    "imageUrl": {
        "type": "String",
    },
    "ingredients": {
        "type": ["String"],
    }
})


const Products = mongoose.model("Products", ProductSchema)

module.exports = Products