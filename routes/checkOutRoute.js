const express = require('express')
const router = express.Router()

const checkoutController = require("../controllers/checkoutController")

router.post('/update-checkout-details', checkoutController.checkout)

module.exports = router