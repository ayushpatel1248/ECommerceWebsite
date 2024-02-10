const e = require('cors');
const Cart = require('../model/Cart');
const Products = require('../model/Products')

const CartServices = {}

CartServices.addToCart = async (userid, items) => {
    try {
        console.log("inside add to cart")
        const { productid, quantity } = items[0];
        console.log("below item")
        console.log(productid)
        console.log(items)

        // checking wheather item is available 
        const isItemAvailble = await Products.findOne({ "_id": productid });
        console.log("is item available = ", isItemAvailble)
        if (!isItemAvailble) {
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
            const updatedCart = await Cart.findOneAndUpdate(cartDetail, { $inc: { "items.$.quantity": quantity } })
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
        // Fetch the cart data
        const isCartAvailable = await Cart.findOne({ userid });

        if (!isCartAvailable) {
            // If cart is not available, return error
            return {
                status: "err",
                msg: "No cart available / cart is empty",
                data: null
            };
        }

        // Fetch product details for each item in the cart
        const itemsWithProducts = await Promise.all(isCartAvailable.items.map(async (el) => {
            const product = await Products.findOne({ "_id": el.productid });
            console.log("we are here ", product)
            return { ...el.toObject(), "product": product };
        }));

        if (itemsWithProducts.length === 0) {
            console.log(itemsWithProducts)

            // If no products found for items in the cart, return error
            return {
                status: "err",
                msg: "No products found for items in the cart",
                data: null
            };
        }
        console.log(itemsWithProducts)

        // Return cart data with product details
        return {
            status: "OK",
            msg: "Cart data sent successfully",
            data: itemsWithProducts
        };
    } catch (error) {
        console.error(error);
        return {
            status: "500",
            msg: "Server error",
            data: null
        };
    }
};



// ------------------------------------------remove  product from cart -------------------------------------------------------


CartServices.removeProduct = async (userid, productid) => {
    try {
        let cartDetail = {
            "userid": userid,
            "items.productid": productid
        }

        //checking if product is available and if available in cart removing it and updating the cart
        const updatedCart = await Cart.findOneAndUpdate(cartDetail, { $pull: { "items": { "productid": productid } } })

        if (updatedCart) {
            return {
                status: "OK",
                msg: "product removed from the cart successfully",
                data: updatedCart
            }
        }
        else {
            return {
                status: "err",
                msg: "no such product available to be removed",
                data: null
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


//-------------------------------------------update cart by 1 or -1-----------------------------------------------------------------------


CartServices.updateCart = async (userid, productid, updation) => {
    try {

        let cartDetail = {
            "userid": userid,
            "items.productid": productid
        }
        console.log(cartDetail)

        const updateQuantity = updation == "inc" ? 1 : -1;

        const updatedCart = await Cart.findOneAndUpdate(cartDetail, { $inc: { "items.$.quantity": updateQuantity } } , {runValidators: true })
        console.log("updated cart = ", updatedCart)

        if (!updatedCart) {
            return {
                status: "err",
                msg: "unable to update the cart",
                data: null
            }
        }
        else {
            return {
                status: "OK",
                msg: "cart updated successfully",
                data: updatedCart
            }
        }
    }
    catch {
        return {
            status: "err",
            msg: "server error",
            data: null
        }
    }

}

module.exports = CartServices