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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import '../../App.css'
import { useSelector, useDispatch } from 'react-redux'
import { setCheckOutData } from '../../store/slices/checkoutSlice';
import UserNotLogin from '../useNotLogin/UserNotLogin';
const baseUrl = process.env.REACT_APP_BASE_URL

const Cart = () => {
    const dispatch = useDispatch();
    var authorization = localStorage.getItem("authorization")
    const navigate = useNavigate()
    //this is state for storing cart data of user 
    const [cartData, setCartData] = useState([])
    const [isUserLogin , setIsUserLogin] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)


    const viewCart = async () => {
        try {
            console.log("auth token is = ", authorization)
            if (authorization) {
                const viewCartApiHit = await axios.post(`${baseUrl}/cart/viewCart`, null, {
                    headers: {
                        'authorization': authorization
                    }
                })
                // console.log(viewCartApiHit)
                setCartData(viewCartApiHit.data.data)
                // console.log(viewCartApiHit.data)
            }
            else {
                setIsUserLogin(true)
            }
        }
        catch (err) {
            console.log("in catch = ", err)
            setIsUserLogin(true)
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

    useEffect(() => {
        setTotalAmount(cartData.reduce((acc, el) => {
            acc = acc + (el.quantity * el.product.price)
            return acc;
        }, 0) || 0)
    }, [cartData])





    return (
        <>
            <Header />
           <div>
            {isUserLogin?<UserNotLogin></UserNotLogin>:<div> <div className='cart-body backgroundWithPurple'>
                <div className="shopping-cart">
                    <div className="title">
                        Shopping Bag
                    </div>
                    {console.log("cart data = ", cartData)}

                    {cartData.length == 0 || !cartData ? <h2>no item in cart</h2> :
                        cartData.map((el, index) => {
                            return <div className="item">
                                <div className="image">
                                    <img src={el.product?.images[0]} alt="" />
                                </div>
                                <div className="description">
                                    {console.log(el.product)}
                                    <span>{el.product?.brand}</span>
                                    <span>{el.product?.description}</span>
                                    <span>{el.product?.name}</span>
                                </div>

                                <div className="quantity">
                                    <button className="minus-btn button-plus-minus" type="button" onClick={() => updateCart(el.productid, "dec")}>
                                        <RemoveIcon />
                                    </button>
                                    <input type="text" name="name" value={el.quantity} />
                                    <button className="plus-btn button-plus-minus" type="button" onClick={() => updateCart(el.productid, "inc")}>
                                        <AddIcon />
                                    </button>
                                </div>

                                <div className="total-price"><CurrencyRupeeIcon fontSize="small" />{Math.ceil(el.product?.price * el?.quantity)}</div>
                                <div className='delete-item-icon'>
                                    <button onClick={() => deleteProduct(el.productid)}><DeleteIcon /></button>
                                </div>
                                {/* <button class="buttonRemoveItem">Remove Item</button> */}
                                <br />
                                {/* <div className='removeButtonParent'>
                                <button className="buttonRemoveItem" onClick={() => deleteProduct(el.productid)}>
                                    <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                                </button>
                                </div> */}

                            </div>
                        })}




                </div>

            </div>
            <div className="cart-footer">
                <div className="total-cart-price">Total = <CurrencyRupeeIcon className="font24px" />{Math.round(totalAmount)}</div>
                <button className="checkout-button"
                onClick={async()=>{
                    dispatch(setCheckOutData(cartData))
                   await axios.post(`${baseUrl}/checkout/update-checkout-details`,{checkoutDetails:cartData},{headers:{'authorization': authorization}})
                    navigate("/check-out")
                }}
                >
                    <span className="button-content">CHECKOUT </span>
                </button>

            </div>
            {console.log(cartData)}</div>}
           </div>
        </>
    );
}



export default Cart;
