import * as React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./header.css";
import logo from '../../images/header/codiance-high-resolution-logo-white-transparent.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export default function Header() {
    const [searchToggle, setSearchToggle] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)

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

    return (
        <nav className={sidebarOpen ? "" : "active"}>
            <div class="nav-bar">
                <i class={sidebarOpen ? "bx bx-menu sidebarOpen" : "bx bx-menu sidebarOpen active"} onClick={handleSidebarOpen} ></i>
                <span class="logo navLogo"><img src={logo} alt="" /></span>

                <div class="menu">
                    <div class="logo-toggle">
                        <span class="logo"><a href="#">Codiance</a></span>
                        <i class='bx bx-x siderbarClose' onClick={handleSidebarOpen}></i>
                    </div>

                    <ul class="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="">Orders</Link></li>
                        <li><Link to="">All Products</Link></li>
                        <li><Link to="">Services</Link></li>
                        <li><Link to="">Contact Us</Link></li>
                    </ul>
                </div>

                <div class="darkLight-searchBox">
                    
                    <div class="searchBox">
                        <div class={searchToggle ? "searchToggle active" : "searchToggle"} onClick={handleSearchToggle}>
                            <i class='bx bx-x cancel'></i>
                            <i class='bx bx-search search'></i>
                        </div>

                        <div class="search-field">
                            <input type="text" placeholder="Search..." />
                            <i class='bx bx-search'></i>
                        </div>
                    </div>
                    <div class="">
                       <Link to="/cart"> <ShoppingCartOutlinedIcon style={{ color: 'white' , marginLeft:'1rem'}}/></Link>
                    </div>
                    <div class="">
                    <Link to="/profile"><AccountCircleOutlinedIcon style={{ color: 'white', marginLeft:'1.4rem' }}/></Link>
                    </div>
                </div>
            </div>
        </nav >

    );
}
