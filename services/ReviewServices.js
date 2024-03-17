const Review = require("../model/Review")
const Product = require("../model/Products")
const ReviewServices = {}

ReviewServices.createReview = async(userID,productID,rating,comment)=>{
try{
    // console.log(userID," ",productID," ",typeof(rating)," ",comment)
    const createdReview = await  Review.create({userID,productID,rating,comment});
    let totalReviewOnProduct = await Review.find({productID})
    console.log("toal review=>",totalReviewOnProduct)
    let sumOfRating = 0;
    let toalNumberOfRatedPeople = totalReviewOnProduct.length
    totalReviewOnProduct.forEach((el)=>{
        sumOfRating = sumOfRating + el.rating
    })
    let num = sumOfRating/toalNumberOfRatedPeople;
   let convertedNum = num.toFixed(1)
   let inFloat = parseFloat(convertedNum);
   const returnData =  await Product.findOneAndUpdate({_id: productID},{rating:inFloat})
   console.log("return data = >",returnData)
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

ReviewServices.getReviewByProductId = async(product_id)=>{
    try{


    }catch(err){
        return({
            status:"err in review service",
            msg:err,
            data:null
        })
    }
}


module.exports = ReviewServices


