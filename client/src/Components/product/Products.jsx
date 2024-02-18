import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import image from '../../images/loginImg/login.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
// import image from '../../images/loginImg/login.svg'
import './product.css'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../store/slices/getProductDataSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';



const baseUrl = process.env.REACT_APP_BASE_URL

const Products = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const { getProductData } = useSelector(state => state);
  const navigate = useNavigate()

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
// this to be done properly 
  const handleAddToCart = (el) => {
    const authorization = localStorage.getItem("authorization")
    if (authorization) {
      console.log(el)

    }
    else {
      // axios.post(`${baseUrl}/cart/addtocart`)
      console.log(authorization)

    }
  }

  useEffect(() => {
    dispatch(fetchProductData(1, 4))
  }, [])



  return (
    <div>
      <Header />
      <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
        <Carousel.Item>
          {/* <ExampleCarouselImage text="First slide" /> */}
          <img className='carouselImageMainPage' src="https://ramsonsperfumes.com/cdn/shop/files/valentine-desktop-banner.png?v=1707117319" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="Second slide" /> */}
          <img className='carouselImageMainPage' src="https://armafperfume.com/cdn/shop/files/FRAGRANCES_FOR_HIM_19_JAN_05219ea3-4d2c-4700-b999-e61b6dc8e88f_1024x1024_crop_center.png?v=1705654031" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          {/* <ExampleCarouselImage text="Third slide" /> */}
          <img className='carouselImageMainPage' src="https://armafperfume.com/cdn/shop/files/FRAGRANCES_FOR_HER_19_JAN_95ffe964-e551-4fec-be7f-102de4109043_1024x1024_crop_center.png?v=1705654055" alt="" />
        </Carousel.Item>
      </Carousel>
      <h1 className='our-collection-heading-mainpage'>OUR <br /><strong>Collection</strong></h1>
      <div className='card-product-parent'>
        {getProductData.productData.map((el) => {
          return <div class="card-product">
            <div class="card-img-product"><img src={el.images[0]} alt="" srcset="" /></div>
            <div class="card-info-product">
              <p class="text-title-product">{el.name.length > 20 ? el.name.substr(0, 20) + '...' : el.name}</p>
              <p class="text-body-product">{el.description.length > 20 ? el.description.substr(0, 17) + '...' : el.description}</p>
            </div>
            <div class="card-footer-product">
              <span class="text-title-product">{el.price}</span>
              <div class="card-button-product">
                <svg class="svg-icon-product" viewBox="0 0 20 20" onClick={()=>handleAddToCart(el)}>
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                </svg>
              </div>
            </div>
          </div>
        })}
      </div>

      {/* all product button start  */}
      <div className='allproducts-button-parent'>
        <Link to="/allProducts">
          <button class="button-allproducts type1-allproducts">
            <span class="btn-txt-allproducts">View All Products</span>
          </button></Link>
      </div>

      <h1 className='our-collection-heading-mainpage'>Best For You<br /><strong>Where luxury Meets Fragnance</strong></h1>

      {/* last cards  */}
      <div class="container-cards-products">
        <div class="card-cards-products">
          <img src="https://armafperfume.com/cdn/shop/files/now_VANITY_femme_350x.png?v=1707983520" alt="" srcset="" />
        </div>
        <div class="card-cards-products">
          <img src="https://armafperfume.com/cdn/shop/files/SILLAGE_FOOTER_BANNER_MAIN_350x.png?v=1707988923" alt="" srcset="" />        </div>
        <div class="card-cards-products">
          <img src="https://armafperfume.com/cdn/shop/files/TRES_NUIT_FOOTER_BANNER_MAIN_350x.png?v=1707988958" alt="" srcset="" />        </div>
      </div>

      <h1 className='our-collection-heading-mainpage'>Notes<br /><strong>Fragnance You Need </strong></h1>


      <div className='flower-parent'>
        <button class="btn-flower">
          <div class="wrapper-flower">
            <p class="text-flower">Lavender</p>

            <div class="flower flower1">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower2">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower3">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower4">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower5">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower6">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
          </div>
        </button>
        <button class="btn-flower">
          <div class="wrapper-flower">
            <p class="text-flower">Flower</p>

            <div class="flower flower1">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower2">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower3">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower4">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower5">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower6">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
          </div>
        </button>
        <button class="btn-flower">
          <div class="wrapper-flower">
            <p class="text-flower">Fresh</p>

            <div class="flower flower1">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower2">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower3">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower4">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower5">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower6">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
          </div>
        </button>
        <button class="btn-flower">
          <div class="wrapper-flower">
            <p class="text-flower">Musky</p>

            <div class="flower flower1">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower2">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower3">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower4">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower5">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
            <div class="flower flower6">
              <div class="petal one"></div>
              <div class="petal two"></div>
              <div class="petal three"></div>
              <div class="petal four"></div>
            </div>
          </div>
        </button>

      </div>
      {/* {console.log(getProductData.productData)} */}


      <Footer />
    </div>
  )
}

export default Products
