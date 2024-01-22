const Cart = require('../model/Cart');
const Products = require('../model/Products')

const CartServices = {}

CartServices.addToCart = async (userid, items) => {
    try {
        const { productid, quantity } = items[0];
        console.log(productid)
        console.log(items)

        // checking wheather item is available 
        const isItemAvailble = await Products.findOne({ "_id": productid });
        console.log(isItemAvailble)
        if (isItemAvailble == null) {
            return {
                status: "ERR",
                msg: "Product is unavailble",
                data: null
            }
        }

        // checking if user already have a cart 
        let isCartAvailble = await Cart.findOne({ "userid": userid });
        console.log(isCartAvailble, "we are below finding cart")

        let cartDetail = {
            "userid": userid,
            "items.productid": productid
        }

        if (!isCartAvailble) {
            let cartDetail2 = {
                "userid": userid,
                "items": items
            }
            console.log("inside if condition")
            updatedCart = await Cart.create(cartDetail2)
            return {
                status: "OK",
                msg: "Item added to cart successfully",
                data: updatedCart
            }
        }
        else {
            console.log("we are in else condition")
            var updatedCart = await Cart.findOneAndUpdate(cartDetail, { $inc: { "items.$.quantity": 1 } })
            console.log(updatedCart)
            if (updatedCart) {
                return {
                    status: "OK",
                    msg: "Item added to cart successfull",
                    data: updatedCart
                }
            }
            else {
                console.log(" we are in last else condition")
                updatedCart = await Cart.findOneAndUpdate({ "userid": userid }, { $push: { items: items[0] } })
                console.log("here = ",updatedCart)
                return {
                    status: "OK",
                    msg: "Item added to cart successful",
                    data: updatedCart

                }
            }

        }

        //     var updatedCart = await Cart.findOneAndUpdate(cartDetail, {$inc:{"items.quantity":1}})

        //     if(updatedCart){
        //         return {
        //             status:"OK",
        //             msg:"Item added to cart successfull",
        //             data:updatedCart
        //         }
        //     }  
        //     else{
        //         //now adding new product in cart as product is not already in cart
        //         let cartDetail2 = {
        //             "userid":userid,
        //             "items":items
        //         }
        //         updatedCart = await Cart.create(cartDetail2)
        //         return {
        //             status:"OK",
        //             msg:"Item added to cart successfully",
        //             data:updatedCart
        //         }
        //     }
    }
    catch {
        return {
            status: "500",
            msg: "server error",
            data: null
        }
    }
}


module.exports = CartServices