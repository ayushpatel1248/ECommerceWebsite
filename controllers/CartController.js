const CartServices = require("../services/CartService")

const CartController = {}

CartController.addToCart = async (req, res)=>{
    const {userid, items} = req.body; 
    const result = await CartServices.addToCart(userid, items);
    console.log(result)
    res.send(result)
}

module.exports = CartController 