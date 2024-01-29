const Products = require('../model/Products')
const ProductServices = {};

ProductServices.getProduct = async (skip, limit) => {

    let numberOfSkip = (skip - 1) * limit;

    return (await Products.aggregate([
        { $lookup: {
            from:"brands", // The collection to join with
            localField: "brand", // The field from the input documents (products collection)
            foreignField: "name", // The field from the documents of the "brands" collection
            as: "brand" // The alias for the new array field containing the joined documents
          },},
        { $skip: numberOfSkip },
        { $limit: limit }
      ]))
}

ProductServices.getProductDesc = async(_id)=>{
  console.log("product id is =>",typeof(_id))
  return (await Products.findOne({_id}))
}
ProductServices.getProductById = async(_id)=>{
  try{
    const foundedProducts = await Products.findOne({_id})
    return({
      status:"ok",
      msg:"product is sucessfully found by id",
      data : foundedProducts
    })
  }catch(err){
    return({
      status:"err",
      msg:"invalid product id or no product is available with given id",
      data : err
    })
  }
  
}
module.exports = ProductServices;


// -----------------------------------------this will send products-----------------------------------------


