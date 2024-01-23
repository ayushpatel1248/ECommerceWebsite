const CartServices = require("../services/CartService")

const CartController = {}

// for authorization token will be writing login later write now direcly taking userid in body

CartController.addToCart = async (req, res)=>{
    const {userid, items} = req.body; 
    const result = await CartServices.addToCart(userid, items);
    console.log(result)
    res.send(result)
}

// ----------------------------------------------------------------------------------------------------------------

CartController.viewCart = async (req, res)=>{
    const {userid} = req.body;
    const result = await CartServices.viewCart(userid);
    res.send(result)
}

// ------------------------------------------------------------------------------------------------------------------

CartController.removeProduct = async (req, res)=>{
    const {userid, productid} = req.body;
    const result = await CartServices.removeProduct(userid, productid);
    res.send(result);
}

//  ------------------------------------------------------------------------------------------------------------------

CartController.updateCart = async (req, res)=>{
    const {userid, productid, updation} = req.body;
    const result = await CartServices.updateCart(userid, productid, updation);
    res.send(result)
}


module.exports = CartController 