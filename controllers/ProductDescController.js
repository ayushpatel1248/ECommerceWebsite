const express = require("express")
const ProductsService = require("../services/ProductsService")

const ProductController = {}

ProductController.getProductDetails = async (req, res) => {
  try {
    const { product_id } = req.query;
    if (product_id == undefined || product_id == null) {
      return res.send({
        status: "err",
        msg: "product_id is required field",
        data: null
      })
    }
    else {
      const data = await ProductsService.getProductDesc(product_id)
      res.send({
        status: "ok",
        msg: "sucessfully data fetched",
        data: data
      })
    }
  } catch (err) {
    res.status(500).send({
      status: "err",
      msg: "err in server side at ProductDescController",
      data: err
    })
  }
}

// right now addidng add product also in the descirption controller afterwords we have to make a one file for controller to add all product related contorller in one file 

module.exports = ProductController
