import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Header from "../header/Header";
import profileImg from "../../images/profileImg/chims.jpeg";
import { useDispatch } from 'react-redux';
import "./profile.css";
import { viewData } from '../../store/slices/userLoginDataSlice';
const Profile = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(viewData(localStorage.getItem("authorization")))
  },[])

  return (
    <div>
      <Header />
     {/* {useSelector((state)=>{state})} */}
    </div>
  )
}

export default Profile
