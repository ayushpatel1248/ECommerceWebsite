import React, { useEffect, useState } from 'react'
import UserNotLogin from '../useNotLogin/UserNotLogin'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../store/slices/userLoginDataSlice'
import "./checkout.css"
import { Checkbox } from '@mui/material';
const CheckOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [UserNotLogi, setUserNotLogi] = useState(true)
    const [userData, setUserData] = useState({})
    const [pymentMethod, setPaymentMethod] = useState("")
    const [checkoutProductDetails , setCheckoutProductDetails] = useState([])

    
    useEffect(() => {
        const auth = localStorage.getItem("authorization") 
        if (auth) {
            setUserNotLogi(false)
            dispatch(fetchData(localStorage.getItem("authorization"))) //get data of user . here equired to get address of user
        }
    }, [])

    let data = useSelector((state) => state.userLoginData.userData?.address) // fetch address of user
    let checkOutDetails = useSelector((state)=>state.checkout.checkoutProductArray)
    console.log("checkout details = ",checkOutDetails)
useEffect(()=>{
    setCheckoutProductDetails(checkOutDetails)
},[checkOutDetails])
    useEffect(() => {
        setUserData(data);
    }, [data])
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
                                        <input type="radio" name="payment-method" id="" onChange={(e)=>{setPaymentMethod(e.target.value)}}/>
                                        <label for="UPI">UPI</label>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="d-flex gap-4">
                                   {/* product */}
                                    {checkoutProductDetails.map((el)=>{
                                        return(<div>
                                            {console.log(el.product)}
                                           <div className='img-div'> <img src={`${el?.product?.images[0]}`} alt="loading image ..." /></div>
                                            <h6>{el?.product?.name}</h6>
                                            <p>price : {el?.product?.price}</p>
                                            

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
                                        <span>$10.00</span>
                                        <span>Tax:</span>
                                        <span>$30.40</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card checkout-checkout">
                        <div className="footer-checkout">
                            <label className="price-checkout">$280.40</label>
                            <button className="checkout-btn-checkout">proceed to pay</button>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default CheckOut
