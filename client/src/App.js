import React, { useEffect, useState } from "react";
import Login from "./Components/login/Login";
import Loader from "./Components/Loader";
import Header from "./Components/header/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./Components/register/Register";


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
        <Route path="/login" element={isLoading == true ? <Loader /> : <div> <Login /></div>} />
        <Route path="/register" element={isLoading == true ? <Loader /> : <div> <Register /></div>} />
        <Route path="/header" element={isLoading == true ? <Loader /> : <div> <Header /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
