const express = require("express")

const route = express.Router()

const AddBrandController = require("../controllers/AddBrandController")
route.post("/add" , AddBrandController.add)

module.exports = route 