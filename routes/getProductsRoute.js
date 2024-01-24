const express = require("express")

const route = express.Router()

const getProductController = require("../controllers/getProductController")
route.get("/products", getProductController.getProduct)

module.exports = route