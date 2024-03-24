import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./productDescription.css"
// import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Navigate, useParams } from "react-router-dom";
import { fetchProductDetail } from '../../store/slices/productDescSlice';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
import axios from 'axios';
import { setCheckOutData } from '../../store/slices/checkoutSlice';
import { useNavigate } from 'react-router-dom';

const ProductDescription = () => {
    const navigate = useNavigate();
    let { product_id } = useParams();
    const dispatch = useDispatch();
    const [opacity, setOpacity] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [isDiscountAvailable, setIsDiscountAvailable] = useState(false)
    const [giveRatingVisbility, setGiveRatingVisbility] = useState(false)
    const [allReviews, setAllReviews] = useState([])
    const [comment, setComment] = useState("")
    const [value, setValue] = useState(0);
    const notify = (mes) => toast.error(mes);
    const notifySucess = (mes) => toast(mes);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const productData = useSelector((state) => state.productDesc.productDetail[0])

    const fetchReview = (product_id) => {
        axios.post(`${BASE_URL}/review/get-review`, { product_id }).then((res) => {
            console.log("res on fetch rerview", res.data.data)
            setAllReviews(res.data.data)
        }).catch((err) => {
            console.log(err, "on fetch review")
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setOpacity(1)
        }, 1100)
        dispatch(fetchProductDetail(product_id))
        fetchReview(product_id)
        setIsLoading(false)
    }, [])
    useEffect(() => {
        if (productData?.discount) {
            setIsDiscountAvailable(true)
        } else {
            setIsDiscountAvailable(false)
        }

    }, [productData])
    const ratingSchema = Yup.object().shape({
        rating: Yup.number().required('rating is required'),
        comment: Yup.string().required('comment is required'),

    });
    const handelSubmitRating = async (e) => {
        console.log(value, comment)

        try {
            await ratingSchema.validate({ rating: value, comment })
            const auth = localStorage.getItem("authorization")
            if (auth) {

                axios.post(`${BASE_URL}/review/set-review`, { productID: product_id, rating: value.toString(), comment }, { headers: { authorization: auth } }).then((res) => {
                    console.log(res)
                    if (res.data.status == "ok") {
                        notifySucess(res.data.msg)
                        setGiveRatingVisbility(false)
                    } else {
                        notify(res.data.msg)
                        setGiveRatingVisbility(false)
                    }
                }).catch((err) => {
                    console.log("error inaxios of productdescription on set review", err)
                    notify(err.message)
                })
            } else {
                notify("unauthorized user , please login first")
            }

        } catch (err) {
            notify(err.message)
        }
    }
    return (
        <div>
            {console.log(productData)}
            {isLoading ? <Loader /> :
                <div className='parent-product-desc'>
                    <Header />
                    <div className={isDiscountAvailable ? "font-family description-text description-text-div discount-desc-div text-center" : "display-none-desc  font-family"} style={{ opacity: opacity }}>{productData?.discount}% off</div>
                    <div>
                        <div className='dispay-flex'>
                            {/* image div */}

                            <div className="product-desc-div product-animation">
                                {/* <Scrollbars
                                    autoHide
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    scrollSpeed={0.1}
                                    renderThumbVertical={({ style, ...props }) => (
                                        <div {...props} className="product-desc-div-scroll" style={{ ...style }} />
                                    )}
                                  >
                                   
                                   </Scrollbars> */}
                                {productData?.images?.map((el) => { return <img src={el} ></img> })}

                            </div>



                            <div className='mt-5 desc-parent'>
                                {/* Name */}
                                <div className='desc '>

                                    <h1 className='desc-child desc-name font-family' style={{ opacity: opacity }}>
                                        {productData?.name}.
                                    </h1>
                                </div>

                                {/* description div */}
                                <div className='mt-5'><h1 className='description-text font-weight-600 description-text-div font-family' style={{ opacity: opacity }}>Description :</h1></div>
                                <div className='desc '>

                                    <h3 className='desc-child font-family h' style={{ opacity: opacity }}>
                                        {productData?.description}
                                    </h3>
                                </div>

                                {/* brand div */}
                                <div className='mt-5 desc-brand' style={{ opacity: opacity }}>
                                    <div><h1 className='description-text font-weight-600 description-text-div font-family' style={{ opacity: opacity }}>Brand :</h1></div>
                                    <div className='desc '>

                                        <h3 className='desc-child font-family h' style={{ opacity: opacity }}>
                                            {productData?.brand[0]?.name}
                                        </h3>
                                    </div>
                                </div>
                                {/* genderr */}
                                <div className='mt-4 description-text description-text-div' style={{ opacity: opacity }}>
                                    <p className='font-family desc-gender-parent '>fragrance  is best for <span className='desc-gender'>{productData?.gender}</span> !</p>
                                    <p className='font-family desc-gender-parent '>fragrance  is available in <span className='desc-gender'>{productData?.volume}ml</span> Bottel</p>
                                </div>




                            </div>
                        </div>
                        {/* buy sell */}     {/* price */}
                        <div className='d-flex buy-sell-price-parent'>
                            <div className='desc-buy-sell-div  '>
                                {/* buy */}
                                <div
                                    data-tooltip={`Price:₹${productData?.price}`} className="button-buy-desc buy-sell-desc"
                                    onClick={async () => {
                                        dispatch(setCheckOutData([{ product: productData, quantity: 1 }]))
                                        await axios.post(`${BASE_URL}/checkout/update-checkout-details`, { checkoutDetails: [{ product: productData, quantity: 1, ingredients: productData?.ingredients[0] }] }, { headers: { 'authorization': localStorage.getItem("authorization") } })
                                        navigate("/check-out")
                                    }}

                                >
                                    <div className="button-wrapper-buy-desc">
                                        <div className="text-buy-desc">Buy Now</div>
                                        <span className="icon-buy-desc">
                                            <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                {/* buy-end */}
                                {/* add to cart start */}
                                <button className="CartBtn-add-to-cart-desc buy-sell-desc ">
                                    <span className="IconContainer-add-to-cart-desc">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                    </span>
                                    <p className="text-add-to-cart-desc pt-3">Add to Cart</p>
                                </button>
                                {/* add to cart end */}
                            </div>
                            <div className='pl-4 price-desc '>
                                <div className='border-top description-text description-text-div pt-4 price-div' style={{ opacity: opacity }}>
                                    <h2 className='description-text font-weight-600 description-text-div font-family' style={{ opacity: opacity }}>Price :</h2>
                                    <h1 className={isDiscountAvailable ? 'font-family text-decoration-desc' : "font-family"}>{productData?.price} ₹</h1>
                                </div>
                                <div className={isDiscountAvailable ? "font-family description-text description-text-div " : "display-none-desc  font-family"} style={{ opacity: opacity }}>
                                    <h3 className="description-text red-yellow-animation-desc" style={{ opacity: opacity }}>Now available in only : {(parseInt(productData?.price) - ((parseInt(productData?.price) / 100) * parseInt(productData?.discount)))}₹</h3>
                                </div>
                            </div>
                        </div>
                        {/* rating */}
                        <div className='rating-div'>

                            <div className='frag-available'>
                                <h2 className='description-text-div font-family' style={{ opacity: opacity }}>Available Frangrence </h2>
                                <div className='mt-4 description-text description-text-div' style={{ opacity: opacity }}>
                                    {productData?.ingredients?.map((el) => { return (<p className='font-family desc-gender-parent '>-&gt; {el}</p>) })}

                                </div>
                            </div>


                            <div className='rating-main-div'>
                                <h2 className='description-text font-weight-600 description-text-div font-family' style={{ opacity: opacity }}>Average Rating Of PRODUCT :</h2>
                                <div><Rating name="read-only" size="large" value={productData?.rating == undefined ? 0 : productData?.rating} readOnly />  </div>
                                <div className='btn-rating'>   <button className='button-rating ' onClick={() => { setGiveRatingVisbility(true) }}> <span>rate product </span></button></div>
                            </div>


                        </div>
                        <div className={giveRatingVisbility ? 'visibal give-rating-div' : "not-visibal give-rating-div"}>
                            <div className=''>
                                <div className='rating-inner-div'>
                                    <div ><textarea rows="3" cols="35" placeholder='enter comment on product'
                                        onChange={(e) => { setComment(e.target.value) }}
                                        value={comment}
                                    ></textarea></div>
                                    <div className='btn-rating'><Rating name="simple-controlled" size="large" value={value} onChange={(event, newValue) => { setValue(newValue); }} /></div>
                                    <div className='rating-btn-div'>
                                        <div className='btn-rating'> <button className='button-rating' onClick={() => { setGiveRatingVisbility(false) }}><span>cancle</span></button></div>
                                        <div className='btn-rating'> <button className='button-rating' onClick={handelSubmitRating}><span>submit rating</span></button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {allReviews?.map((el) => {
                                return (
                                    <div className='reviewShow'>
                                        <div>
                                            <h3>{el?.user[0]?.userName}</h3>
                                            <p><Rating name="read-only" value={el?.rating == undefined ? 0 : el?.rating} readOnly />  </p>
                                            <p className='comment'>Comment On Product : {el?.comment}</p>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    {/* <div className='footer'>
<Footer/>
</div> */}
                </div>}
            <ToastContainer />
        </div>

    )
}

export default ProductDescription
