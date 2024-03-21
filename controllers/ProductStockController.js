const express = require("express")
const ProductsService = require("../services/ProductsService")
const verifyAdminAuth = require("../reUseAbleFunctions/decryptAdminAuth")

const ProductStockController = {}



ProductStockController.addProduct = async (req, res) => {
    const { authorization } = req.headers;
    console.log("authorization is ", authorization)
    const _id = verifyAdminAuth(authorization)
    const {name, description, brand, price, discount, stock, volume, gender, thumbnail, images, ingredients} = req.body;
    const productInfo = {name, description, brand, price, discount, stock, volume, gender, thumbnail, images, ingredients}
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
  

  module.exports = ProductStockController
