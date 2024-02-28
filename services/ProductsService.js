const Products = require('../model/Products')
const mongoose = require('mongoose');
const ProductServices = {};

ProductServices.getProduct = async (skip, limit) => {

  let numberOfSkip = (skip - 1) * limit;

  const productData = await Products.aggregate([
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
  ])

  const count = await Products.aggregate([{ $count: "count" }])
  //  productData.push(count[0])
  return { productData, count: count[0] }
}

ProductServices.getProductDesc = async (_id) => {
  console.log("product id is =>", _id)

  const partialRes = await Products.findOne({ _id })
  const result = await Products.aggregate([
    {
      $match: {
        _id: partialRes._id // Match by the _id obtained from findOne
      }
    },
    {
      $lookup: {
        from: "brands", // The collection to join with
        localField: "brand", // The field from the input documents (products collection)
        foreignField: "name", // The field from the documents of the "brands" collection
        as: "brand" // The alias for the new array field containing the joined documents
      }
    }
  ]);
  return (result)
  // return (await Products.findOne({ _id }))
}




ProductServices.getProductByName = async (name) => {
  try {
    console.log(name)

    let responseData = await Products.find({ name: { $regex: name, $options: "i" } })

    console.log(responseData)
    if (responseData.length == 0) {
      try {
        const regexPattern = new RegExp(`^${name[0]}`, 'i');
        responseData = await Products.find({ name: regexPattern })
        if (responseData.length == 0) {
          return ({
            status: "err",
            msg: "no data found by given nameeeeeee",
            data: responseData
          })
        } else {
          return ({
            status: "ok",
            msg: "data id found by given name",
            data: responseData
          })
        }
      } catch (error) {
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


