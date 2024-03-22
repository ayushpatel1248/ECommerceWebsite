const Checkout = require("../model/checkout")
const mongoose = require("mongoose")

const CheckOutServices = {}

CheckOutServices.updateCheckoutList = async (checkoutDetails, authData) => {

    try {
        const objectId =new mongoose.Types.ObjectId(authData);
        const foundedUser = await Checkout.findOne({userID:objectId })
console.log("foundedUser",foundedUser)
        if (foundedUser) {
          let updated = await Checkout.findOneAndUpdate({ userID: objectId }, { checkoutDetails: checkoutDetails })
          return({
            status:"ok",
            msg:"checkout sucesfully changed",
            data:updated
          })

        }
        else {
            let updated =  await Checkout.create({userID:authData ,checkoutDetails:checkoutDetails})
           return({
            status:"ok",
            msg:"checkout sucesfully changed",
            data:updated
          })
        }


    } catch (err) {
        return ({
            status: "err",
            msg: "err at server side at checkoutservice",
            data: err
        })
    }


}

CheckOutServices.getCheckoutList = async(authData)=>{
  try{
    const objectId =new mongoose.Types.ObjectId(authData);
    const foundedUser = await Checkout.findOne({userID:objectId })
    return({
      status:"ok",
      msg:"sucessfully checkcout list fetched",
      data:foundedUser
    })

  }catch(err){
    return ({
      status: "err",
      msg: "err at server side at checkoutservice",
      data: err
  })
  }

}

module.exports = CheckOutServices;