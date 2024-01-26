const express = require('express')

const router = express.Router()

const PasswordController = require("../controllers/PasswordController")

router.post('/otpForPassword',PasswordController.otpForforgotPassword)
router.post('/verifyOtpAndSetPassword' , PasswordController.verifyOtpAndSetPassword)
router.post('/resetPassword', PasswordController.resetPassword);

module.exports = router


