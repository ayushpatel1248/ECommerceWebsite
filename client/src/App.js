import React, { useEffect, useState } from "react";
import Login from "./Components/login/Login";
import LoginAdmin from "./Components/login/LoginAdmin";
import Loader from "./Components/Loader";
import Header from "./Components/header/Header";
import { Route, Routes, BrowserRouter ,useParams  } from "react-router-dom";
import Register from "./Components/register/Register";
import RegisterAdmin from "./Components/register/RegisterAdmin";
import Products from "./Components/product/Products";
import ForgetPassword from "./Components/forgetPassword/ForgetPassword";
import Profile from "./Components/profile/Profile"
import ProductDescription from "./Components/productDescription/ProductDescription";
import Cart from "./Components/cart/Cart";
import NewPassword from "./Components/newpassword/NewPassword";
import AllProductsPage from "./Components/allProductsPage/AllProductsPage";
import AddProduct  from "./Components/AddProduct/AddProduct";
import SearchDataPage from "./Components/searchDataPage/SearchDataPage";
import "./Components/global.css"
import axios from 'axios';

function App() {
  const [isLoading, setIsloading] = useState(true);
// for wake up server
const BASE_URL = process.env.REACT_APP_BASE_URL;
  setInterval(()=>{
    console.log("wakeup call")
    axios.get(`${BASE_URL}/health/health`).then((res)=>{
      console.log("in then")
    }).catch((err)=>{
      console.log("in err")
    })
  },800000)

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false)
    }, 1000)
    
  }, [])
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={isLoading == true ?<Loader />: <div> <Products /></div>} />
        <Route path="/login" element={isLoading == true ? <Loader /> : <div> <Login /></div>} />
        <Route path="/loginAdmin" element={isLoading == true ? <Loader /> : <div> <LoginAdmin/></div>} />
        <Route path="/register" element={isLoading == true ? <Loader /> : <div> <Register /></div>} />
        <Route path="/registerAdmin" element={isLoading == true ? <Loader /> : <div> <RegisterAdmin/></div>} />
        <Route path="/forget-password" element={isLoading == true ? <Loader /> : <div> <ForgetPassword /></div>} />
        <Route path="/forget-password/set-new-password" element={isLoading == true ? <Loader/> : <div> <NewPassword/></div>} />
        <Route path="/header" element={isLoading == true ? <Loader /> : <div> <Header /></div>}/>
        <Route path="/profile" element={ <Profile/>}/> 
        <Route path="/cart" element={isLoading == true ? <Loader /> : <div><Cart /></div>} />
        <Route path="/allProducts" element={isLoading == true ? <Loader /> : <div><AllProductsPage /></div>} />
        <Route path="/product-description/:product_id" element={isLoading == true ? <Loader /> : <div><ProductDescription /></div>} />
        <Route path="/search" element={isLoading == true ? <Loader /> : <div><SearchDataPage/></div>} />
        <Route path="/AddProduct" element={isLoading == true ? <Loader /> : <div><AddProduct/></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
