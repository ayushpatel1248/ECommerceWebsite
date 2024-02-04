import React, { useEffect, useState } from "react";
import Login from "./Components/login/Login";
// import Button from "./components/Button";
import Loader from "./components/Loader";
import Header from "./Components/header/Header";


function App() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setIsloading(false)
    },100) 
  },[])
  return (
    <div>
      {isLoading == true ? <Loader /> : <div>
        <Header/>
        <Login/>
    </div>}

 {/* <Button
          padding={"0px 400px"}
          color={"white"}
          fontWeight={"900"}
          fontSize={"60px"}
          borderRadius={"40px"}
          fontFamily={"Noto Serif"}
          background={"linear-gradient(90deg, hsla(312, 66%, 76%, 1) 0%, hsla(234, 93%, 67%, 1) 100%)"}
          value={"sumbit"}
        /> */}
      {/* <i className="fa fa-font-awesome" aria-hidden="true"></i> */}
    </div>
  );
}

export default App;
