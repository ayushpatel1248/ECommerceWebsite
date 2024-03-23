import React, { useEffect, useState } from 'react'
import UserNotLogin from '../useNotLogin/UserNotLogin'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../store/slices/userLoginDataSlice'
import "./checkout.css"
import { Checkbox } from '@mui/material';
import axios from 'axios';
const CheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [UserNotLogi, setUserNotLogi] = useState(true)
    const [userData, setUserData] = useState({})
    const [pymentMethod, setPaymentMethod] = useState("")
    const [subTotal , setSubTotal] = useState(0);
    const[quantity , setQuantity] = useState(0)
    const [checkoutProductDetails, setCheckoutProductDetails] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL
   
    useEffect(() => {
        const auth = localStorage.getItem("authorization")

        if (auth) {
            setUserNotLogi(false)
            dispatch(fetchData(localStorage.getItem("authorization"))) //get data of user . here equired to get address of user
            axios.post(`${BASE_URL}/checkout/update-checkout-get-details`,
            null,
            {
                headers:
                    { "authorization": auth }
            }
        ).then((res) => {
            if(res.data.status=="ok"){
                console.log("this is response=",res.data.data.checkoutDetails)
                setCheckoutProductDetails(res.data.data.checkoutDetails)

            }else{
                console.log("errr in axios at checkout...")
            }
           

        }).catch((err) => {
            console.log("err in axaxios at checkout side...")
        })
        }
    }, [])

    let data = useSelector((state) => state.userLoginData.userData?.address) // fetch address of user
    useEffect(() => {
        setUserData(data);

    }, [data])

    useEffect(() => {
        let total = 0
        checkoutProductDetails.map((el)=>{
            if(el?.product?.discount){
                let discount = 0;
                discount = discount +(el?.quantity*(el?.product?.price-((el?.product?.price/100)*el?.product?.discount)))
                total = total+discount
                // setSubTotal(subtotal)
            }
            else{
               
                // setSubTotal(subTotal + (el?.quantity*el?.product?.price))
                total = total+el?.quantity*el?.product?.price
            }
        })
        setSubTotal(total)
        // console.log("useeEffect", total)

    }, [checkoutProductDetails])

    return (
        <div>
            {UserNotLogi == true ? <div><UserNotLogin /></div> :

                <div className="container-checkout">
                    <div className="card-checkout cart-checkout">
                        <label className="title-checkout">CHECKOUT</label>
                        <div className="steps-checkout">
                            <div className="step-checkout">
                                <div>
                                    {console.log(userData)}
                                    <span>SHIPPING</span>
                                    <p>{userData?.street}</p>
                                    <p>{userData?.city}, {userData?.state} , {userData?.postalCode} </p>
                                    <button onClick={() => {
                                        navigate("/profile")
                                    }}>update address</button>
                                </div>
                                <hr></hr>
                                <div>
                                    <span>PAYMENT METHOD</span>

                                    {/* <div>
                                        <input type="radio" name="payment-method" id="" />
                                        <label for="COD">COD</label>
                                    </div> */}
                                    <div>
                                        <input type="radio" name="payment-method" id="" onChange={(e) => { setPaymentMethod(e.target.value) }} />
                                        <label for="UPI">UPI</label>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="d-flex gap-4">
                                    {/* product */}
                                    {checkoutProductDetails.map((el) => {
                                        return (<div>
                                            <div className='img-div'>
                                                 <img src={`${el?.product?.images[0]}`} alt="loading image ..." />
                                            </div>
                                            <h6>{el?.product?.name}</h6>
                                            <p>price : {el?.product?.price}</p>
                                           {el?.product?.discount ?<div>
                                                <p>discount:{el?.product?.discount}%</p>
                                                <p>price after discount: {el?.product?.price-((el?.product?.price/100)*el?.product?.discount)}</p>
                                            </div>:""} 
                                            <p>quantity: {el?.quantity}</p>
                                            <button
                                            onClick={(()=>{
                                                axios.post(`${BASE_URL}/checkout/update-checkout-change-quantity`,
                                                {
                                                    "productId":el?.product._id,
                                                    "quantity":el?.quantity+1
                                                },{
                                                    headers:{"authorization":localStorage.getItem("authorization")}
                                                }
                                                )
                                            })}
                                            >+</button>
                                            <button>-</button>
                                        </div>)
                                    })}
                                </div>
                                <hr></hr>
                                <div className="payments-checkout">
                                    <span>PAYMENT</span>
                                    <div className="details-checkout">
                                        <span>Subtotal:</span>
                                        <span>$240.00</span>
                                        <span>Shipping:</span>
                                        <span>$0.00</span>
                                        <span>Tax:</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card checkout-checkout">
                        <div className="footer-checkout">
                            <label className="price-checkout">{subTotal} ₹</label>
                            <button className="checkout-btn-checkout">proceed to pay</button>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default CheckOut
