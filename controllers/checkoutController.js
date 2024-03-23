const joi = require('joi');
const decryptAuth = require("../reUseAbleFunctions/decryptAuth");
const CheckOutServices = require("../services/CheckOutService")


const checkoutController = {}

const schema = joi.object({
    checkoutDetails: joi.array().required()
})

checkoutController.checkout = async (req, res) => {

    const { authorization } = req.headers;
    const { checkoutDetails } = req.body;
    const authData = decryptAuth(authorization)

    try {
        if (authData) {

            try {
                await schema.validateAsync({ checkoutDetails });

                const returnData = await CheckOutServices.updateCheckoutList(checkoutDetails, authData)
                res.send(returnData)


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
        res.send({
            status: "err",
            msg: "err at server side at checkout controller",
            data: null
        })
    }


}

checkoutController.getCheckout = async (req, res) => {

    const { authorization } = req.headers;

    const authData = decryptAuth(authorization)

    try {
        if (authData) {
            const returnData = await CheckOutServices.getCheckoutList(authData)
            res.send(returnData)

        } else {
            res.send({
                status: "err ",
                msg: "invalid token",
                data: null
            })
        }


    } catch (err) {
        res.send({
            status: "err",
            msg: "err at server side at checkout controller",
            data: null
        })
    }

}

checkoutController.changeQuantity = async (req,res)=>{
    const {productId , quantity } = req.body;
    const { authorization } = req.headers;
    const authData = decryptAuth(authorization)

    try{
        if(authData){
            const returnData = await CheckOutServices.changeQuantity(productId,authData,quantity)
            res.send(returnData)


        }else{
            res.send({
                status: "err ",
                msg: "invalid token",
                data: null
            })
        }

    }catch(err){
        res.send({
            status: "err",
            msg: "err at server side at checkout controller",
            data: null
        })
    }

}
module.exports = checkoutController