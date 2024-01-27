const express = require('express')
const router = express.Router()
const UserController = require("../controllers/UserController")

router.post('/addProfileInfo', UserController.addProfileInfo)

module.exports = router 