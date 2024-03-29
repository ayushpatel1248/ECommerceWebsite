import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./header.css";
import logo from '../../images/header/codiance-high-resolution-logo-white-transparent.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { fetchSearchData } from '../../store/slices/searchDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = process.env.REACT_APP_BASE_URL

export default function Header() {
    const [searchToggle, setSearchToggle] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [search, setSearch] = useState(true)
    const [cartCount , setCartCount] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearchToggle = (e) => {

        if (searchToggle == true) {
            setSearchToggle(false)
        }
        else {
            setSearchToggle(true)
        }
    }
    const handleSidebarOpen = (e) => {

        if (sidebarOpen == true) {
            setSidebarOpen(false)
        }
        else {
            setSidebarOpen(true)
        }
    }

    // in this function we will use the slice function for search to hit api and store search data in search state and willredirect to serach founded page 

    const handleSearchData = () => {
        dispatch(fetchSearchData(search));
        navigate(`/search`)
    }

    const handleCartCount = async ()=>{
        const authorization = localStorage.getItem("authorization")
        const res = await axios.post(`${baseUrl}/cart/cartCount`,null, {headers:{authorization}})
        console.log("this is result of hanlde cart count ", res)
        setCartCount(res.data.data.count)
    }
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 5,
          border: `2px solid white`,
          padding: '0 4px',
        },
      }));


      useEffect(()=>{
        handleCartCount()
      },[])

    return (
        <nav className={sidebarOpen ? "nav" : "nav active"}>
            <div className="nav-bar">
                <i className={sidebarOpen ? "bx bx-menu sidebarOpen" : "bx bx-menu sidebarOpen active"} onClick={handleSidebarOpen} ></i>
                <span className="logo navLogo"><img src={logo} alt="" /></span>
                <div className="menu">
                    <div className="logo-toggle">
                        <span className="logo"><a href="#">Codiance</a></span>
                        <i className='bx bx-x siderbarClose' onClick={handleSidebarOpen}></i>
                    </div>

                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">Orders</Link></li>
                        <li><Link to="/allProducts">All Products</Link></li>
                        <li><Link to="">Services</Link></li>
                        <li><Link to="">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="darkLight-searchBox">

                    <div className="searchBox">
                        <div className={searchToggle ? "searchToggle active" : "searchToggle"} onClick={handleSearchToggle}>
                            <i className='bx bx-x cancel'></i>
                            <i className='bx bx-search search'></i>
                        </div>

                        <div className="search-field">
                            <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                            <i className='bx bx-search' onClick={handleSearchData}></i>
                        </div>
                    </div>
                    <div className="">
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartCount} style={{ color: 'white'}}>
                            <Link to="/cart"> <ShoppingCartOutlinedIcon style={{ color: 'white', marginLeft: '0.5rem' }} /></Link>
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div className="">
                        <Link to="/profile"><AccountCircleOutlinedIcon style={{ color: 'white', marginLeft: '1.4rem' }} /></Link>
                    </div>
                </div>
            </div>
        </nav >

    );
}
