const Review = require("../model/Review")
const ReviewServices = {}

ReviewServices.createReview = async(userID,productID,rating,comment)=>{
try{
    // console.log(userID," ",productID," ",typeof(rating)," ",comment)
    const createdReview = await  Review.create({userID,productID,rating,comment});
    return({
        status:"ok",
        msg:"review sucessfully entered",
        data : createdReview
    })

}catch(err){
    return({
        status:"err",
        msg:"err in review services",
        data : err
    })
}
}

ReviewServices.getReviewByUserIdAndProductId = async(userID,productID)=>{
   
   try{
    const data = await Review.findOne({userID , productID})
    if(data==null){
        return({
            status:"ok",
            msg:"first time review",
            data : data
        })
    }else{
        return({
            status:"err",
            msg:"review already entered",
            data : data
        })
    }
   } catch(err){
       return({
        status:"err",
        msg:"err in server side at reviewService",
        data : err
       });
   }
}



module.exports = ReviewServices


