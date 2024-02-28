const Products = require("../model/Products")
const Brand = require("../model/Brand")
const filterServices = {}

filterServices.filter = async (lowPrize, highPrize, brand) => {
console.log("type of low prize",typeof(lowPrize))
console.log("type of high prize",typeof(highPrize))
    //this is for if filter is only on prize
    if (lowPrize != undefined && highPrize != undefined && brand == undefined) {
        if (lowPrize < highPrize) {
            let data = await Products.find({ price: { $gte: lowPrize, $lte: highPrize } })
            if (data.length == 0) {
                return ({
                    status: "err",
                    msg: "no product in this prize range",
                    data: data
                })
            }
            else {
                return ({
                    status: "ok",
                    msg: "filtered data ",
                    data: data
                })
            }
        } 
        else {
            return ({
                status: "err",
                msg: "lowprize should be less than highPrize",
                data: null
            })
        }
    }
    //this is for if filter is only on brand
    if (lowPrize == undefined && highPrize == undefined && brand != undefined) {
        let foundedBrand = await Brand.findOne({ name: brand })
        if (foundedBrand != null) {
            let daata = await Products.find({ brand: brand })
            return ({
                status: "ok",
                msg: "filtered data ",
                data: daata
            })
        } 
        else {
            return ({
                status: "err",
                msg: "brand not exist...",
                data: null
            })
        }

    }
    //this is for if filter on prize and brand both
    if (lowPrize != undefined && highPrize != undefined && brand != undefined) {
        if (lowPrize < highPrize) {
            let foundedBrand = await Brand.findOne({ name: brand })
            if (foundedBrand != null) {
                let data2 = await Products.find({ $and: [{ price: { $gte: lowPrize, $lte: highPrize } }, { brand: brand }] })
                if (data2.length == 0) {
                    return ({
                        status: "err",
                        msg: "no product in this prize range",
                        data: null
                    })
                } else {
                    return ({
                        status: "ok",
                        msg: "filtered data ",
                        data: data2
                    })
                }

            } else {
                return ({
                    status: "err",
                    msg: "brand not exist...",
                    data: null
                })
            }
        } else {
            return ({
                status: "err",
                msg: "lowprize should be less than highPrize",
                data: null
            })
        }
    } else if (lowPrize == undefined || highPrize == undefined) {
        return ({
            status: "err",
            msg: "lowPrize and highPrize is required field",
            data: null
        })
    }


}
module.exports = filterServices












