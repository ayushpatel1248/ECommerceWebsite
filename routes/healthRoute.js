const express = require('express')
const router = express.Router()

const healthController = require("../controllers/healthController")
router.get('/health' , healthController.health)

module.exports = router