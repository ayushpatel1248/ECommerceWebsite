import React, { useEffect, useState } from "react";


// import Button from "./components/Button";
import Loader from "./components/Loader";
function App() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setIsloading(false)
    },2000) 
  },[])
  return (
    <div>
      {isLoading == true ? <Loader /> : <div>
        <h1>Hello World ...</h1>
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
