const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    foundedYear: {
        type: Number,
    },
    logoUrl: {
        type: String,
        required: true
    },
  
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand; 