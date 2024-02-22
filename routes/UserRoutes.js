const express = require('express')
const router = express.Router()
const UserController = require("../controllers/UserController")

router.post('/addProfileInfo', UserController.addProfileInfo)
router.post('/getUserData' , UserController.getUserData)
router.post("/updateUserEmail",UserController.updateUserEmail)
router.post("/updateUserName",UserController.updateUserName)
router.post("/updateUserMobileNumber",UserController.updateUserMobileNumber)
router.post("/updateUserAddress",UserController.updateUserAddress)
router.post("/updateUserImage",UserController.updateUserImage)
module.exports = router 