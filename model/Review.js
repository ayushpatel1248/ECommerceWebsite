const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      }

})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review; 