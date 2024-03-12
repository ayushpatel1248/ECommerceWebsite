const express = require("express")

const route = express.Router()

const ProductDescController = require("../controllers/ProductDescController")
route.get("/Product-Description" , ProductDescController.getProductDetails)

route.post("/addProduct" , ProductDescController.addProduct)

module.exports = route;
