const express = require("express")

const route = express.Router()

const AddBrandController = require("../controllers/AddBrandController")
route.post("/add-brand" , AddBrandController.add)

module.exports = route