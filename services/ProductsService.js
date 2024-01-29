const Products = require('../model/Products')
const ProductServices = {};

ProductServices.getProduct = async (skip, limit) => {

  let numberOfSkip = (skip - 1) * limit;

  return (await Products.aggregate([
    {
      $lookup: {
        from: "brands", // The collection to join with
        localField: "brand", // The field from the input documents (products collection)
        foreignField: "name", // The field from the documents of the "brands" collection
        as: "brand" // The alias for the new array field containing the joined documents
      },
    },
    { $skip: numberOfSkip },
    { $limit: limit }
  ]))
}
ProductServices.getProductByName = async (name) => {
  try {
    console.log(name)
   
    let responseData = await Products.find({ name: { $regex: name, $options: "i" } }, { description: 0, discount: 0, images: 0, ingredients: 0, stock: 0 })

    console.log(responseData)
    if (responseData.length == 0) {
      try{
        const regexPattern = new RegExp(`^${name[0]}`, 'i');
        responseData = await Products.find({name:regexPattern},{description:0 ,discount:0 ,images:0,ingredients:0, stock:0})
        if (responseData.length == 0){
          return ({
              status: "err",
              msg: "no data found by given nameeeeeee",
              data: responseData
            })
        }else{
          return ({
            status: "ok",
            msg: "data id found by given name",
            data: responseData
          })
        }
      }catch(error){
        return ({
          status: "err",
          msg: "err in server side at ProductService in getProductByName",
          data: error
        })
      }
   
   
    } else {
      return ({
        status: "ok",
        msg: "data id found by given name",
        data: responseData
      })
    }
  } catch (err) {
    return ({
      status: "err",
      msg: "err in server side at ProductService in getProductByName",
      data: err
    })
  }
}
ProductServices.getProductDesc = async (_id) => {
  console.log("product id is =>", typeof (_id))
  return (await Products.findOne({ _id }))
}
ProductServices.getProductById = async (_id) => {
  try {
    const foundedProducts = await Products.findOne({ _id })
    return ({
      status: "ok",
      msg: "product is sucessfully found by id",
      data: foundedProducts
    })
  } catch (err) {
    return ({
      status: "err",
      msg: "invalid product id or no product is available with given id",
      data: err
    })
  }

}
module.exports = ProductServices;


// -----------------------------------------this will send products-----------------------------------------


