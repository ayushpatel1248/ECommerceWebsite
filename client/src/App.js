import React, { useEffect, useState } from "react";
import Login from "./Components/login/Login";
import Loader from "./Components/Loader";
import Header from "./Components/header/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./Components/register/Register";
import Products from "./Components/product/Products";
import ForgetPassword from "./Components/forgetPassword/ForgetPassword";
import Cart from "./Components/cart/Cart";


function App() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false)
    }, 1000)
  }, [])
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={isLoading == true ? <Loader /> : <div> <Products /></div>} />
        <Route path="/login" element={isLoading == true ? <Loader /> : <div> <Login /></div>} />
        <Route path="/register" element={isLoading == true ? <Loader /> : <div> <Register /></div>} />
        <Route path="/forget-password" element={isLoading == true ? <Loader /> : <div> <ForgetPassword /></div>} />
        <Route path="/header" element={isLoading == true ? <Loader /> : <div> <Header /></div>} />
<<<<<<< HEAD
        <Route path="/cart" element={isLoading == true ? <Loader /> : <div><Cart /></div>} />

=======
       
 
>>>>>>> a2e66ec583dc23d4e0865985882404be0198b875
      </Routes>
    </BrowserRouter>
  );
}

export default App;
