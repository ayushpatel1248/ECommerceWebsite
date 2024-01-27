const express = require("express")
const route  = express.Router();

const filterController = require("../controllers/filterController")
route.get("/filter", filterController.filter )

module.exports = route;