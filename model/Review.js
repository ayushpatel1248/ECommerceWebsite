const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        required: true,
      },
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        min:0,
        max:5,
        required: true,
      },
      comment: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }

})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review; 