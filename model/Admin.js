const mongoose = require('mongoose');

const { Schema } = mongoose;

const sellerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: { type: String },
    companyAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String, enum: ['india'] },
    },
    contactPhoneNumber: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        // required: true
    },
})


const Admin = mongoose.model("Admin", sellerSchema)

module.exports = Admin