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
            var updatedCart = await Cart.findOneAndUpdate(cartDetail, { $inc: { "items.$.quantity": quantity } })
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
                console.log("here = ", updatedCart)
                return {
                    status: "OK",
                    msg: "Item added to cart successful",
                    data: updatedCart

                }
            }

        }
    }
    catch {
        return {
            status: "500",
            msg: "server error",
            data: null
        }
    }
}


// -------------------------------------------view products in cart ---------------------------------------------------------

// for authorization token will be writing login later write now direcly taking userid in body

CartServices.viewCart = async (userid) => {
    try {
        const isCartAvailble = await Cart.findOne({userid});
        console.log("cartdata = ", isCartAvailble)
        if(isCartAvailble){
            return{
                status:"OK",
                msg:"cart data send successfully",
                data:isCartAvailble.items
            }
        }
        else{
            return{
                status:"err",
                msg:"no cart available / cart is empty",
                data:null
            }
        }
    }
    catch{
        return {
            status:"500",
            msg:"server error",
            data:null
        }
    }


}



// ------------------------------------------remove  product from cart -------------------------------------------------------


CartServices.removeProduct = async (userid, productid)=>{
    try{
        let cartDetail = {
            "userid": userid,
            "items.productid": productid
        }

        //checking if product is available and if available in cart removing it and updating the cart
        const updatedCart = await Cart.findOneAndUpdate(cartDetail,  { $pull: { "items": { "productid": productid } } } )

        if(updatedCart){
            return{
                status:"OK",
                msg:"product removed from the cart successfully",
                data:updatedCart
            }
        }
        else{
            return{
                status:"err",
                msg:"no such product available to be removed",
                data:null
            }
        }
    }
    catch{
        return{
            status:"500",
            msg:"server error",
            data:null
        }
    }
} 

module.exports = CartServices