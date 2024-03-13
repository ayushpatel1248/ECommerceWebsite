const express = require("express")

const route = express.Router()

const ProductStockController = require("../controllers/ProductStockController")

route.post("/addProduct" , ProductStockController.addProduct)

module.exports = route;
