const e = require('cors');
const Cart = require('../model/Cart');
const Products = require('../model/Products')

const CartServices = {}

CartServices.addToCart = async (userid, productid) => {
    try {
        console.log("inside add to cart")
        // const { productid, quantity } = items[0];
        console.log("below item")
        console.log(productid)


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
        const items = [{
            "productid": productid,
            "quantity": 1
        }]

        // checking if user already have a cart 
        let isCartAvailble = await Cart.findOne({ "userid": userid });
        console.log(isCartAvailble, "we are below finding cart")

        let cartDetail = {
            "userid": userid,
            "items.productid": productid
        }
        console.log("this is cart detail" ,cartDetail)

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
            else{
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
    catch (err) {
        return {
            status: "500",
            msg: "server error",
            data: err
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
                data: []
            };
        }


        // Fetch product details for each item in the cart
        const itemsWithProducts = await Promise.all(isCartAvailable.items.map(async (el) => {
            const product = await Products.findOne({ "_id": el.productid });
            // console.log("we are here ", product)
            return { ...el.toObject(), "product": product };
        }));



        console.log("above items with product length ", itemsWithProducts.length)
        if (itemsWithProducts.length == 0 || itemsWithProducts == null) {
            // console.log(itemsWithProducts)

            // If no products found for items in the cart, return error
            return {
                status: "err",
                msg: "No products found in the cart",
                data: []
            };
        }
        // console.log(itemsWithProducts)

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
            data: []
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

        // here checking if cart item has become zero or less then zero then deleting this item using privous remove service

        const isCartProductZero = await Cart.findOne(cartDetail);
        console.log("is cart product zero = ", isCartProductZero.items.find((el) => el.productid == productid).quantity <= 1 && updateQuantity == -1, updateQuantity)
        if (isCartProductZero.items.find((el) => el.productid == productid).quantity <= 1 && updateQuantity == -1) {
            try {
                console.log("inside if condition of iscartzero checker")
                const result = await CartServices.removeProduct(userid, productid)
                return result;
            }
            catch (err) {
                return {
                    status: "err",
                    msg: "some error occured while deleting the item when its quanity is zero in cart",
                    data: null
                }
            }
        }

        const updatedCart = await Cart.findOneAndUpdate(cartDetail, { $inc: { "items.$.quantity": updateQuantity } }, { runValidators: true })
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


// ---------------------------------------this gives the cart count --------------------------------------------------------------------------

CartServices.cartCount =  async (userid)=>{
    try{
        const cartFound = await Cart.findOne({userid})
        if(!cartFound){
            return{
                status:"err",
                msg:"no cart found",
                data: {count:0}
            }
        } 
        else{
            return{
                status:"OK",
                msg:"cart found with following items count",
                data:{count:cartFound.items.length}
            }
        }
    }
    catch(err){
        return{
            status:"err",
            msg:"server error",
            data:{count:0}
        }
    }
}
module.exports = CartServices