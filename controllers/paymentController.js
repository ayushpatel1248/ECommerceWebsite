
const Razorpay = require("razorpay")
const paymentController = {}
// key    = rzp_test_5vCtetDLuicEC0
// secret = cmIREs2gimnmFLl1bN8AfVoJ
paymentController.payment = async(req,res)=>{

    const options = req.body

    const razorpay = new Razorpay({
        key_id:"rzp_test_5vCtetDLuicEC0",
        key_secret:"cmIREs2gimnmFLl1bN8AfVoJ"
    })
    const order = await razorpay.orders.create(options)

    if(!order){
        res.send({
            status:"err",
            msg:"err in payment section",
            data:null
        })
    }else{
        res.send({
            status:"ok",
            msg:"payment runs",
            data:order
        })
    }

}

module.exports = paymentController