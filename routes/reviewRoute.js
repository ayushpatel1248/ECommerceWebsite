const express = require("express")

const route = express.Router();

const ReviewController = require("../controllers/ReviewController")
route.post("/set-review",ReviewController.setReview)
// to do makin route for get review
module.exports = route