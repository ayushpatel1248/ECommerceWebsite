const CartServices = require("../services/CartService")
const verifyAuth = require("../reUseAbleFunctions/decryptAuth")

const CartController = {}


CartController.addToCart = async (req, res) => {
    const { items } = req.body;
    const { authorization } = req.headers;
    const userid = verifyAuth(authorization)
    console.log("userid =" ,userid)
    if (userid) {
        const result = await CartServices.addToCart(userid, items);
        console.log(result)
        res.send(result)
    }
    else {
        res.send({
            status: "err",
            msg: "error occured while verifying user",
            data: null
        })
    }
}

// ----------------------------------------------------------------------------------------------------------------

CartController.viewCart = async (req, res) => {
    const { authorization } = req.headers;
    const userid = verifyAuth(authorization)
    const result = await CartServices.viewCart(userid);
    res.send(result)
}

// ------------------------------------------------------------------------------------------------------------------

CartController.removeProduct = async (req, res) => {
    const { productid } = req.body;
    const { authorization } = req.headers;
    const userid = verifyAuth(authorization)
    const result = await CartServices.removeProduct(userid, productid);
    res.send(result);
}

//  ------------------------------------------------------------------------------------------------------------------

CartController.updateCart = async (req, res) => {
    const { productid, updation } = req.body;
    const { authorization } = req.headers;
    const userid = verifyAuth(authorization)
    const result = await CartServices.updateCart(userid, productid, updation);
    res.send(result)
}


module.exports = CartController 