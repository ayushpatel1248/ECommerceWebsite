const express = require("express");
const decryptAuth = require("../reUseAbleFunctions/decryptAuth");
const ProductServices = require("../services/ProductsService");
const ReviewServices = require("../services/ReviewServices");
const joi = require('joi');
const ReviewController = {}

const schema = joi.object({
    productID: joi.string().required(),
    rating: joi.string().required(),
    comment: joi.string().min(1).required(),
})
ReviewController.setReview = async (req, res) => {

    const { authorization } = req.headers;
    const { productID, rating, comment } = req.body;
    const authData = decryptAuth(authorization)
    try {
        if (authData != null) {
            try {
                await schema.validateAsync({ productID, rating, comment });
                let ratingInInt = Number(rating)
                const productIsAvailable = await ProductServices.getProductById(productID)
                if (productIsAvailable.status == "ok") {
                   const getReview = await  ReviewServices.getReviewByUserIdAndProductId(authData ,productID );
                   if(getReview.status =="ok"){
                    const response = await ReviewServices.createReview(authData ,productID , ratingInInt ,comment);
                    res.send(response)
                   }else{
                    res.send(getReview)
                   }
                    
                } else {
                    res.send(productIsAvailable)
                }
            } catch (err) {
                res.send({
                    status: "err",
                    msg: "validation error",
                    data: err.message
                })
            }




        } else {
            res.send({
                status: "err ",
                msg: "invalid token",
                data: null
            })
        }
    } catch (err) {

        return (res.send({
            status: "err",
            msg: "err in review controller",
            data: err
        }))
    }
}

module.exports = ReviewController