const express = require('express')
const router = express.Router()

const checkoutController = require("../controllers/checkoutController")

router.post('/update-checkout-details', checkoutController.checkout)
router.post('/update-checkout-get-details', checkoutController.getCheckout)
router.post('/update-checkout-change-quantity', checkoutController.changeQuantity)
router.post('/update-checkout-change-ingredients', checkoutController.ingredients)

module.exports = router