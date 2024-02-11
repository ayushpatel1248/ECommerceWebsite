import React, { useState } from 'react';
import './cart.css';
// import Header from '../header/Header';
// import perfumeImg from '../../images/cart/perfume.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import imageof from '../../images/loginImg/login.svg'
import Header from '../header/Header'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = process.env.REACT_APP_BASE_URL

const Cart = () => {
    var authorization = localStorage.getItem("authorization")
    const navigate = useNavigate()
    //this is state for storing cart data of user 
    const [cartData, setCartData] = useState([])


    const viewCart = async () => {
        try {
            console.log("auth token is = ", authorization)
            if (authorization) {
                const viewCartApiHit = await axios.post(`${baseUrl}/cart/viewCart`, null, {
                    headers: {
                        'authorization': authorization
                    }
                })
                console.log(viewCartApiHit)
                setCartData(viewCartApiHit.data.data)
                console.log(viewCartApiHit.data)
            }
            else{
                navigate('/login')
            }
        }
        catch (err) {
            console.log("in catch = ",err)
            navigate('/login')
        }
    }

    const deleteProduct = async (productid) => {
        try {
            const deletedItem = await axios.post(`${baseUrl}/cart/removeProduct`, { "productid": productid }, {
                headers: {
                    'authorization': authorization
                }
            })
            viewCart();
            console.log("item deleted successfully")
        }
        catch (err) {
            console.log("error while deleting the item from cart")
        }
    }

    const updateCart = async (productid, updation) => {
        try {
            console.log(updation)
            const updatedCart = await axios.post(`${baseUrl}/cart/updateCart`, { productid, updation }, { headers: { 'authorization': authorization } })
            console.log(updatedCart)
            viewCart();
            console.log("cart updated successfully")
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        viewCart()
    }, [])

    return (
        <>
            <Header />
            <div className='cart-body'>
                <div className="shopping-cart">
                    <div className="title">
                        Shopping Bag
                    </div>
                    {console.log("cart data = ", cartData)}

                    {cartData.length == 0 || !cartData? <h2>no item in cart</h2> :
                        cartData.map((el, index) => {
                            return <div className="item">
                                <div className="image">
                                    <img src={imageof} alt="" />
                                </div>
                                <div className="description">
                                    {console.log(el.product)}
                                    <span>{el.product?.brand}</span>
                                    <span>{el.product?.description}</span>
                                    <span>{el.product?.name}</span>
                                </div>

                                <div className="quantity">
                                    <button className="minus-btn" type="button" onClick={() => updateCart(el.productid, "dec")}>
                                        <RemoveIcon />
                                    </button>
                                    <input type="text" name="name" value={el.quantity} />
                                    <button className="plus-btn" type="button" onClick={() => updateCart(el.productid, "inc")}>
                                        <AddIcon />
                                    </button>
                                </div>

                                <div className="total-price">{el.product?.price}</div>
                                <div className='delete-item-icon'>
                                    <button onClick={() => deleteProduct(el.productid)}><DeleteIcon /></button>
                                </div>

                            </div>
                        })}



                    {/* Add more items here */}

                </div>

            </div>
            <div className="cart-footer">
                <div className="total-cart-price">Total = $1234</div>
                <button class="checkout-button">
                    <span class="button-content">CHECKOUT </span>
                </button>

            </div>
            {console.log(cartData)}
        </>
    );
}



export default Cart;
