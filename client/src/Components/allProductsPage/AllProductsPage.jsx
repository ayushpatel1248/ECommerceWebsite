import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData, fetchFilteredProductData } from '../../store/slices/getProductDataSlice';
import './allProductPage.css'
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
import { storeProductData } from '../../store/slices/productDescSlice';
import { useNavigate } from 'react-router-dom';

const AllProductsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getProductData } = useSelector(state => state);
    const [value, setValue] = React.useState([0, 400]);
    const [sideBarActive, setSideBarActive] = useState(false)

    useEffect(() => {
        dispatch(fetchProductData(1, 10))
    }, [])

    const handlePagination = (pageNumber) => {
        dispatch(fetchProductData(pageNumber, 10))
    }

    const handleFilteredProductData = () => {
        setSideBarActive(false)
        dispatch(fetchFilteredProductData(value[0], value[1]))
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
            <h1 className='our-collection-heading-mainpage'>OUR <br /><strong>Collection</strong></h1>
            <div className='d-flex all-product-page-parent'>
                <Drawer
                    anchor="left"
                    open={sideBarActive}
                    onClose={handleFilteredProductData}
                >
                    <div className="left-side-filter-bar">
                        <h5>CATEGORIES</h5>
                        <h6>Perfumes</h6>
                        <p>Combo</p>
                        <p>Air Fresheners</p>
                        <p className='last-p-best-seller'>Best Sellers</p>
                        <h5>PRICE RANGE</h5>
                        <Box className="slider-allproduct">
                            <Slider
                                min={0}
                                max={400}
                                getAriaLabel={() => 'price range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                sx={{ color: "grey" }}

                            />
                        </Box>
                        <p className='price-range-price'>
                            Rs. 0.0 - Rs. 400.0
                        </p>

                    </div>
                </Drawer>
                <div>
                    <div className='sort-by-parent'>
                        <IconButton onClick={() => setSideBarActive(true)}>
                            <FilterAltIcon />Filter
                        </IconButton>

                        <div>

                            <Box sx={{ minWidth: 40 }} className="sort-by-box">
                                <FormControl sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label">Sort By </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Sort By"
                                    >
                                        <MenuItem value={0}>None</MenuItem>
                                        <MenuItem value={10}>Alphabetically, A-Z</MenuItem>
                                        <MenuItem value={20}>Price, low to high</MenuItem>
                                        <MenuItem value={30}>Price, high to low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    {console.log("ayush",getProductData.productData.productData)}

                    {getProductData.productData.productData == null ? (
                        <Loader />
                    ) : (
                        <div className='card-product-parent'>
                            {Array.isArray(getProductData?.productData?.productData) ? (
                                getProductData?.productData?.productData?.map((el) => (
                                    <div className="card-product card-product-allproduct" key={el.id} 
                                    
                                    onClick={(e)=>{

                                        console.log("dec of product" , el)
                                        dispatch(storeProductData(el))
                                        navigate("/product-description")
                                        
                                    }}> {/* Ensure each element has a unique key */}
                                        <div className="card-img-product"><img src={el.images[0]} alt="" /></div>
                                        <div className="card-info-product">
                                            <p className="text-title-product">{el.name.length > 12 ? `${el.name.substr(0, 12)}...` : el.name}</p>
                                            <p className="text-body-product">{el.description.length > 20 ? `${el.description.substr(0, 17)}...` : el.description}</p>
                                        </div>
                                        <div className="card-footer-product">
                                            <span className="text-title-product">{el.price}</span>
                                            <div className="card-button-product">
                                                {/* SVG or button element goes here */}
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
                <Pagination count={10} variant="outlined" color="primary" onChange={(e, value) => { handlePagination(value) }} />
            </div>
            <Footer />
            {console.log(value)}
        </div >
    )
}

export default AllProductsPage

