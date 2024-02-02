import React from 'react'
import './loader.css'
const Loader = () => {
  return (
    <div className="parent">
    <div className='child'>
    <div className="loader"></div>
    <div><h4>Loading...</h4></div>
    {console.log("loading-----")}
    </div>
 </div>
  )
}

export default Loader
