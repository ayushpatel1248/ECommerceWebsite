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

export default function AdminHeader() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const handleSidebarOpen = (e) => {

        if (sidebarOpen == true) {
            setSidebarOpen(false)
        }
        else {
            setSidebarOpen(true)
        }
    }

    // in this function we will use the slice function for search to hit api and store search data in search state and willredirect to serach founded page 

    
    
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 5,
          border: `2px solid white`,
          padding: '0 4px',
        },
      }));


   

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
                        <li><Link to="/admin-dashboard">Dashboard</Link></li>
                        <li><Link to="">Orders</Link></li>
                        <li><Link to="/AddProduct">Add Product</Link></li>
                        <li><Link to="">Shipping Info</Link></li>
                        <li><Link to=""> Stock Edit</Link></li>
                    </ul>
                </div>

                <div className="darkLight-searchBox">
                    <div className="">
                        <Link to="/profile"><AccountCircleOutlinedIcon style={{ color: 'white', marginLeft: '1.4rem' }} /></Link>
                    </div>
                </div>
            </div>
        </nav >

    );
}
