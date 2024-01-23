const express = require("express")

const route = express.Router()

const UserLoginController = require("../controllers/UserLoginController")
route.post("/login", UserLoginController.login)
 
module.exports = route