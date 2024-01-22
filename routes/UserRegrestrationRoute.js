const express = require("express")
const route = express.Router()


const RegisterController = require("../controllers/RegisterController")
route.post("/register",RegisterController.create);

module.exports = route