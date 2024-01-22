const express = require('express')
const router = express.Router()
const CartController = require("../controllers/CartController")

router.post('/addtocart', CartController.addToCart)
router.post('/viewCart', CartController.viewCart)
router.post('/removeProduct', CartController.removeProduct)

module.exports = router