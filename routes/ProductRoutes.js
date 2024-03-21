const express = require("express")

const route = express.Router()

const ProductStockController = require("../controllers/ProductStockController")
const getProductController = require("../controllers/getProductController")

route.post("/addProduct" , ProductStockController.addProduct)
route.post("/getProductsByUserId" ,getProductController.getProductsByUserId)

module.exports = route;
