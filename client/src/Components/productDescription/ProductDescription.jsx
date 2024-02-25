import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./productDescription.css"
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { motion } from "framer-motion";
const ProductDescription = () => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setOpacity(1)
        }, 1100)
    }, [])
    const productData = useSelector((state) => state.productDesc.productDetail)
    const text = productData?.description?.split(" ");
    console.log(text)
    return (
        <div className='parent-product-desc'>
            <Header />
            <div className='d-flex'>
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
                <div className='mt-5'>
                    <div><h1 className='description-text description-text-div' style={{ opacity: opacity }}>Description :</h1></div>
                    <div className='desc '>

                        <h3 className='desc-child' style={{ opacity: opacity }}>
                            {productData?.description}
                        </h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDescription
