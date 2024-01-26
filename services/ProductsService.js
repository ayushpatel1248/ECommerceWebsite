const Products = require('../model/Products')

const ProductServices = {};

ProductServices.getProduct = async (skip, limit) => {
    
    let numberOfSkip = (skip - 1) * limit ;

    return ( await Products.aggregate( [
        { $match: {} },
        { $skip: numberOfSkip },
        { $limit: limit }
    ])
    )
}
module.exports = ProductServices;


// -----------------------------------------this will send products-----------------------------------------


