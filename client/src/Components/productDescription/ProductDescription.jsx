import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./productDescription.css"
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useParams } from "react-router-dom";
import { fetchProductDetail } from '../../store/slices/productDescSlice';
import Loader from '../Loader';

const ProductDescription = () => {
    let { product_id } = useParams();
    const dispatch = useDispatch();  
    const [opacity, setOpacity] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const productData = useSelector((state) => state.productDesc.productDetail[0])

    useEffect(() => {
        setTimeout(() => {
            setOpacity(1)
        }, 1100)
        dispatch(fetchProductDetail(product_id))
        setIsLoading(false)
    }, [])
    return (
        <div>
            {console.log(productData)}
            {isLoading ? <Loader /> :
                <div className='parent-product-desc'>
                    <Header />
                    <div>
                        <div className='d-flex'>
                            {/* image div */}
                            <div className="product-desc-div product-animation">
                                <Scrollbars
                                    autoHide
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    scrollSpeed={0.1}
                                    renderThumbVertical={({ style, ...props }) => (
                                        <div {...props} className="product-desc-div-scroll" style={{ ...style }} />
                                    )}
                                >
                                    {productData?.images?.map((el) => { return <img src={el} ></img> })}
                                </Scrollbars>
                            </div>
                            {/* description div */}
                            <div className='mt-5'>
                                <div className='desc '>

                                    <h1 className='desc-child desc-name font-family' style={{ opacity: opacity }}>
                                        {productData?.name}.
                                    </h1>
                                </div>
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
                                    <p className='font-family desc-gender-parent '> fragrance  is best for <span className='desc-gender'>{productData?.gender}</span> !</p>
                                </div>

                            </div>
                            {/* price and but sell */}
                        </div>
                        <div className='desc-buy-sell-div  '>
                            {/* buy */}
                            <div data-tooltip={`Price:₹${productData?.price}`} className="button-buy-desc buy-sell-desc">
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
                    </div>

                </div>}
        </div>

    )
}

export default ProductDescription
