import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./productDescription.css"
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { motion } from "framer-motion";
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
                            <div><h1 className='description-text description-text-div' style={{ opacity: opacity }}>Description :</h1></div>
                            <div className='desc '>

                                <h3 className='desc-child' style={{ opacity: opacity }}>
                                    {productData?.description}
                                </h3>
                            </div>
                            {/* brand div */}
                            <div className='mt-5'>
                            <div><h1 className='description-text description-text-div' style={{ opacity: opacity }}>Brand :</h1></div>
                            <div className='desc '>

                                <h3 className='desc-child' style={{ opacity: opacity }}>
                                    {productData?.brand[0]?.name}
                                    
                                </h3>
                            </div>
                            </div>
                        </div>
                        
                    </div>

                </div>}
        </div>

    )
}

export default ProductDescription
