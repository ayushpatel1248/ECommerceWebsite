const mongoose = require("mongoose")

const { Schema } = mongoose;

const ProductSchema = new Schema({

    "name": {
        "type": "String",
        required: true,
    },
    "description" : {
        "type": "String",
        required : true
    },
    "brand": {   "type": mongoose.Types.ObjectId, //isko alag krna he iska alag model 
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
    "stock": {
        "type": "number",
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
    "rating": {
        "type": "Number",
        min: 0,
        max: 5,
    },
    "thumbnail": {
        "type": "String",
        required : true
    },
    "images" : {
        "type":["String"]
    },
    "ingredients": {
        "type": ["String"],
    }
})


const Products = mongoose.model("Products", ProductSchema)

module.exports = Products