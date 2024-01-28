const ProductServices = require("../services/ProductsService")
const getProductController =  {}

 getProductController.getProduct = async (req , res)=>{

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    console.log(skip , " " , limit)
   try{
    let data =  await ProductServices.getProduct(skip , limit);
    res.send({
        status: "ok", 
        msg:"data sucessfully fetched",
        data : data
    })

   }catch(err){ 
    res.send({
        status:"err",
        msg:"limit & skip is required in query",
        data:null
    })
   }
}



module.exports = getProductController 
