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
module.exports = ProductServices;


// -----------------------------------------this will send products-----------------------------------------


