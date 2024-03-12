const express = require("express")
const ProductsService = require("../services/ProductsService")
const verifyAdminAuth = require("../reUseAbleFunctions/decryptAdminAuth")

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

ProductController.addProduct = async (req, res) => {
  const { authorization } = req.headers;
  console.log("authorization is ", authorization)
  const _id = verifyAdminAuth(authorization)
  const {name, description, brand, price, discount, stock, volume, gender, rating, thumbnail, images, ingredients} = req.body;
  const productInfo = {name, description, brand, price, discount, stock, volume, gender, rating, thumbnail, images, ingredients}
  if (_id){
    const result = await ProductsService.addProduct(_id, productInfo)
    res.send(result)
  }
  else{
    res.send({
      status:"err",
      msg:"error while verifying the admin",
      data:null
    })
  }
  
}

// right now addidng add product also in the descirption controller afterwords we have to make a one file for controller to add all product related contorller in one file 

module.exports = ProductController
