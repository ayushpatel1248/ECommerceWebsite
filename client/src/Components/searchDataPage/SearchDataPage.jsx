import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Loader from '../Loader'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import useSound from 'use-sound';
// import audio from "./welcome-64347.mp3"
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL
 

const SearchDataPage = () => {
    // const [play] = useSound(audio);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchData = useSelector(state => state.searchData.searchData);
    // console.log("this is data from redux after fetching = ", getProductData)
    const [value, setValue] = React.useState([0, 400]);
    const [sideBarActive, setSideBarActive] = useState(false)
    const notify = (notifyMessage) => toast(notifyMessage);
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData(searchData)
    },[searchData])

    const handlePagination = (pageNumber) => {
    }

    const handleFilteredProductData = () => {
        setSideBarActive(false)
    }

    const handleAddToCart = async (el ,e) => {
        e.stopPropagation();
        try {
          const authorization = localStorage.getItem("authorization")
          if (authorization) {
            console.log(el)
            const itemAddedToCart = await axios.post(`${baseUrl}/cart/addtocart`, { "productid": el._id }, { headers: { authorization: authorization } })
            console.log(itemAddedToCart)
            notify(itemAddedToCart.data.msg)
          }
          else {
            notify("user must be login first")
          }
        }
        catch (err) {
          notify(err)
        }
      }


    // for range of priz code start


    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
    };


    // side bar of filter activate 

    // const handleSideBarActive = ()=>{

    // }


    return (
        <div>

            <Header />
            <h1 className='our-collection-heading-mainpage'>Your <br /><strong>Search Result</strong></h1>
            <div className='d-flex all-product-page-parent'>
             
                <div>
                 
                    {console.log("this is data = ", data)}

                    {data == null ? (
                        <Loader />
                    ) : (
                        <div className='card-product-parent'>
                            {Array.isArray(data) ? (
                                 data.map((el) => (
                                    <div 
                                    className="card-product card-product-allproduct"
                                     key={el.id}
                                     
                                     onClick={(e)=>{    
                                         navigate(`/product-description/${el._id}`)
                                        //  {play()}    
                                    }}
                                     
                                     >

                                        <div className="card-img-product"><img src={el.images[0]} alt="" /></div>
                                        <div className="card-info-product">
                                            <p className="text-title-product">{el.name.length > 12 ? `${el.name.substr(0, 12)}...` : el.name}</p>
                                            <p className="text-body-product">{el.description.length > 20 ? `${el.description.substr(0, 17)}...` : el.description}</p>
                                        </div>
                                        <div className="card-footer-product">
                                            <span className="text-title-product">{el.price}</span>
                                            <div class="card-button-product">
                                                <svg class="svg-icon-product" viewBox="0 0 20 20"  onClick={(e) => handleAddToCart(el ,e)}>
                                                    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                                    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                                    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className='pagination-parent'>
                {console.log("here present getproduct data  = ", data)}
            </div>
            <Footer />
            <ToastContainer></ToastContainer>
        </div >
    )
}

export default SearchDataPage