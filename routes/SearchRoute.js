const express = require("express");
const route = express.Router();

const SearchController = require("../controllers/SearchController")
route.post("/",SearchController.search)

module.exports = route